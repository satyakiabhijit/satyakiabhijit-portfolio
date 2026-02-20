import { NextResponse } from "next/server";
import { getSiteTheme } from "@/lib/siteTheme";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const theme = await getSiteTheme();
  return NextResponse.json(theme, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
