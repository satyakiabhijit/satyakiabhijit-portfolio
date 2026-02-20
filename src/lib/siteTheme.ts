import "server-only";

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type SeasonTheme = "winter" | "summer" | "rain" | "autumn" | "spring" | "none";

interface SiteThemeConfig {
  season: SeasonTheme;
  updatedAt: string;
}

const SITE_THEME_FILE = path.join(process.cwd(), "public", "site-theme.json");
const DEFAULT_THEME: SiteThemeConfig = {
  season: "winter",
  updatedAt: new Date().toISOString(),
};

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
  try {
    const raw = await readFile(SITE_THEME_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteThemeConfig>;
    return {
      season: normalizeTheme(parsed.season),
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    await mkdir(path.dirname(SITE_THEME_FILE), { recursive: true });
    await writeFile(SITE_THEME_FILE, JSON.stringify(DEFAULT_THEME, null, 2), "utf8");
    return DEFAULT_THEME;
  }
}

export async function setSiteTheme(season: SeasonTheme) {
  const nextConfig: SiteThemeConfig = {
    season,
    updatedAt: new Date().toISOString(),
  };
  await mkdir(path.dirname(SITE_THEME_FILE), { recursive: true });
  await writeFile(SITE_THEME_FILE, JSON.stringify(nextConfig, null, 2), "utf8");
}
