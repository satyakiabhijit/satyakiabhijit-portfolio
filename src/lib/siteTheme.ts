import "server-only";

export type SeasonTheme = "winter" | "summer" | "rain" | "autumn" | "spring" | "none";

interface SiteThemeConfig {
  season: SeasonTheme;
  updatedAt: string;
}

interface SetThemeResult {
  ok: boolean;
  persisted: boolean;
  reason?: string;
}
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
  const envTheme = normalizeTheme(process.env.SITE_THEME);
  return {
    season: envTheme || DEFAULT_THEME.season,
    updatedAt: new Date().toISOString(),
  };
}

export async function setSiteTheme(season: SeasonTheme): Promise<SetThemeResult> {
  return {
    ok: true,
    persisted: false,
    reason: `Set SITE_THEME=${season} in production env and redeploy.`,
  };
}
