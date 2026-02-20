"use server";

import { redirect } from "next/navigation";
import {
  changeAdminPassword,
  clearAdminSession,
  isAdminAuthenticated,
  setAdminSession,
  verifyAdminCredentials,
} from "@/lib/adminAuth";
import { SeasonTheme, setSiteTheme } from "@/lib/siteTheme";

function parseSeasonTheme(value: string): SeasonTheme | null {
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
  return null;
}

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    redirect("/admin/login?error=missing");
  }

  const valid = await verifyAdminCredentials(username, password);
  if (!valid) {
    redirect("/admin/login?error=invalid");
  }

  const sessionSet = await setAdminSession(username);
  if (!sessionSet) {
    redirect("/admin/login?error=setup");
  }
  redirect("/admin?ok=login");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login?ok=logout");
}

export async function updateSeasonAction(formData: FormData) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login?error=auth");
  }

  const season = parseSeasonTheme(String(formData.get("season") ?? ""));
  if (!season) {
    redirect("/admin?error=season");
  }

  try {
    await setSiteTheme(season);
  } catch {
    redirect("/admin?error=theme-write");
  }
  redirect("/admin?ok=season");
}

export async function changePasswordAction(formData: FormData) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login?error=auth");
  }

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const nextPassword = String(formData.get("nextPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!currentPassword || !nextPassword || !confirmPassword) {
    redirect("/admin?error=password-missing");
  }

  if (nextPassword !== confirmPassword) {
    redirect("/admin?error=password-mismatch");
  }

  const result = await changeAdminPassword(currentPassword, nextPassword);
  if (!result.ok) {
    redirect(`/admin?error=${encodeURIComponent(result.reason ?? "password")}`);
  }

  redirect("/admin?ok=password");
}
