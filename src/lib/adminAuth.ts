import "server-only";

import { cookies } from "next/headers";
import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const ADMIN_FILE_PATH = path.join(process.cwd(), ".secure", "admin-auth.json");
const ADMIN_COOKIE_NAME = "admin_session";
const PASSWORD_DIGEST = "sha512";
const PASSWORD_ITERATIONS = 120000;
const PASSWORD_KEY_LENGTH = 64;
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

interface StoredAdminConfig {
  username: string;
  passwordHash: string;
  salt: string;
  iterations: number;
  keyLength: number;
  digest: string;
  updatedAt: string;
}

interface SessionPayload {
  u: string;
  exp: number;
}

function toBase64Url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(input: string): Buffer {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return Buffer.from(padded, "base64");
}

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET environment variable.");
  }
  return secret;
}

function hashPassword(password: string, salt?: string) {
  const actualSalt = salt ?? randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(
    password,
    actualSalt,
    PASSWORD_ITERATIONS,
    PASSWORD_KEY_LENGTH,
    PASSWORD_DIGEST
  ).toString("hex");

  return {
    hash,
    salt: actualSalt,
    iterations: PASSWORD_ITERATIONS,
    keyLength: PASSWORD_KEY_LENGTH,
    digest: PASSWORD_DIGEST,
  };
}

async function ensureAdminConfig(): Promise<StoredAdminConfig> {
  try {
    const raw = await readFile(ADMIN_FILE_PATH, "utf8");
    return JSON.parse(raw) as StoredAdminConfig;
  } catch {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      throw new Error(
        "Missing admin credentials. Set ADMIN_USERNAME and ADMIN_PASSWORD once to initialize."
      );
    }

    const hashed = hashPassword(password);
    const config: StoredAdminConfig = {
      username,
      passwordHash: hashed.hash,
      salt: hashed.salt,
      iterations: hashed.iterations,
      keyLength: hashed.keyLength,
      digest: hashed.digest,
      updatedAt: new Date().toISOString(),
    };

    await mkdir(path.dirname(ADMIN_FILE_PATH), { recursive: true });
    await writeFile(ADMIN_FILE_PATH, JSON.stringify(config, null, 2), "utf8");
    return config;
  }
}

function createSessionToken(payload: SessionPayload): string {
  const body = toBase64Url(JSON.stringify(payload));
  const signature = toBase64Url(
    createHmac("sha256", getSessionSecret()).update(body).digest()
  );
  return `${body}.${signature}`;
}

function verifySessionToken(token: string): SessionPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expectedSignature = toBase64Url(
    createHmac("sha256", getSessionSecret()).update(body).digest()
  );

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (
    sigBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(sigBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(fromBase64Url(body).toString("utf8")) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const config = await ensureAdminConfig();
  if (username !== config.username) return false;

  const hash = pbkdf2Sync(
    password,
    config.salt,
    config.iterations,
    config.keyLength,
    config.digest
  ).toString("hex");

  const hashBuffer = Buffer.from(hash);
  const storedBuffer = Buffer.from(config.passwordHash);
  return (
    hashBuffer.length === storedBuffer.length &&
    timingSafeEqual(hashBuffer, storedBuffer)
  );
}

export async function setAdminSession(username: string) {
  const token = createSessionToken({
    u: username,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  });
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;

  const payload = verifySessionToken(token);
  if (!payload) return false;

  const config = await ensureAdminConfig();
  return payload.u === config.username;
}

export async function changeAdminPassword(
  currentPassword: string,
  nextPassword: string
): Promise<{ ok: boolean; reason?: string }> {
  const config = await ensureAdminConfig();

  const currentValid = await verifyAdminCredentials(config.username, currentPassword);
  if (!currentValid) {
    return { ok: false, reason: "Current password is incorrect." };
  }

  if (nextPassword.length < 8) {
    return { ok: false, reason: "New password must be at least 8 characters." };
  }

  const hashed = hashPassword(nextPassword);
  const updated: StoredAdminConfig = {
    ...config,
    passwordHash: hashed.hash,
    salt: hashed.salt,
    iterations: hashed.iterations,
    keyLength: hashed.keyLength,
    digest: hashed.digest,
    updatedAt: new Date().toISOString(),
  };

  await mkdir(path.dirname(ADMIN_FILE_PATH), { recursive: true });
  await writeFile(ADMIN_FILE_PATH, JSON.stringify(updated, null, 2), "utf8");
  return { ok: true };
}
