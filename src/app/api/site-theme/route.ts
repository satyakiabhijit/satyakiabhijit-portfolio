import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSiteTheme } from "@/lib/siteTheme";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isSeason(value: string | undefined) {
  return (
    value === "winter" ||
    value === "summer" ||
    value === "rain" ||
    value === "autumn" ||
    value === "spring" ||
    value === "none"
  );
}

export async function GET() {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("site_theme")?.value;
  if (isSeason(cookieTheme)) {
    return NextResponse.json(
      {
        season: cookieTheme,
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }

  const theme = await getSiteTheme();
  return NextResponse.json(theme, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
