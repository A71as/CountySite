import { NextRequest } from "next/server";

const localOrigins = ["http://localhost:3000", "http://localhost:3001"];

const configuredSiteOrigin = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  : undefined;

const allowedOrigins = configuredSiteOrigin
  ? [configuredSiteOrigin, ...localOrigins]
  : localOrigins;

export function getCorsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get("origin");

  if (!origin || !allowedOrigins.includes(origin)) {
    return {};
  }

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}
