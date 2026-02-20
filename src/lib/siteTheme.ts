import "server-only";

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type SeasonTheme = "winter" | "summer" | "rain" | "autumn" | "spring" | "none";

interface SiteThemeConfig {
  season: SeasonTheme;
  updatedAt: string;
}

interface SetThemeResult {
  ok: boolean;
  persisted: boolean;
}

const SITE_THEME_FILE = path.join(process.cwd(), "public", "site-theme.json");
const SITE_THEME_KV_KEY = process.env.SITE_THEME_KV_KEY || "site_theme";
const DEFAULT_THEME: SiteThemeConfig = {
  season: "winter",
  updatedAt: new Date().toISOString(),
};
let runtimeTheme: SiteThemeConfig | null = null;

function getKvConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

async function getThemeFromKv(): Promise<SiteThemeConfig | null> {
  const kv = getKvConfig();
  if (!kv) return null;

  try {
    const response = await fetch(
      `${kv.url}/get/${encodeURIComponent(SITE_THEME_KV_KEY)}`,
      {
        headers: { Authorization: `Bearer ${kv.token}` },
        cache: "no-store",
      }
    );
    if (!response.ok) return null;

    const data = (await response.json()) as { result?: unknown };
    if (typeof data.result !== "string" || !data.result) return null;

    const parsed = JSON.parse(data.result) as Partial<SiteThemeConfig>;
    return {
      season: normalizeTheme(parsed.season),
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

async function setThemeInKv(theme: SiteThemeConfig): Promise<boolean> {
  const kv = getKvConfig();
  if (!kv) return false;

  try {
    const encodedValue = encodeURIComponent(JSON.stringify(theme));
    const response = await fetch(
      `${kv.url}/set/${encodeURIComponent(SITE_THEME_KV_KEY)}/${encodedValue}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${kv.token}` },
        cache: "no-store",
      }
    );
    return response.ok;
  } catch {
    return false;
  }
}

function normalizeTheme(value: string | undefined): SeasonTheme {
  if (
    value === "winter" ||
    value === "summer" ||
    value === "rain" ||
    value === "autumn" ||
    value === "spring" ||
    value === "none"
  ) {
    return value;
  }
  return "winter";
}

export async function getSiteTheme(): Promise<SiteThemeConfig> {
  const kvTheme = await getThemeFromKv();
  if (kvTheme) {
    runtimeTheme = kvTheme;
    return kvTheme;
  }

  if (runtimeTheme) {
    return runtimeTheme;
  }

  try {
    const raw = await readFile(SITE_THEME_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteThemeConfig>;
    return {
      season: normalizeTheme(parsed.season),
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    try {
      await mkdir(path.dirname(SITE_THEME_FILE), { recursive: true });
      await writeFile(
        SITE_THEME_FILE,
        JSON.stringify(DEFAULT_THEME, null, 2),
        "utf8"
      );
    } catch {
      // Ignore write errors on read-only hosting and continue with defaults.
    }
    runtimeTheme = DEFAULT_THEME;
    return runtimeTheme;
  }
}

export async function setSiteTheme(season: SeasonTheme): Promise<SetThemeResult> {
  const nextConfig: SiteThemeConfig = {
    season,
    updatedAt: new Date().toISOString(),
  };
  runtimeTheme = nextConfig;

  const kvSaved = await setThemeInKv(nextConfig);
  if (kvSaved) {
    return { ok: true, persisted: true };
  }

  try {
    await mkdir(path.dirname(SITE_THEME_FILE), { recursive: true });
    await writeFile(SITE_THEME_FILE, JSON.stringify(nextConfig, null, 2), "utf8");
    return { ok: true, persisted: true };
  } catch {
    return { ok: true, persisted: false };
  }
}
