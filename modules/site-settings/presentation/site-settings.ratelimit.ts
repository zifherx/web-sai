import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

/**
 * Ambos endpoints son exclusivamente del CMS (requieren sesión):
 * - GET   → "cms-read"      (20 req/60s)
 * - PATCH → "authenticated" (30 req/60s)
 */
function resolveSiteSettingsTier(req: NextRequest): RateLimitTier {
  return req.method.toUpperCase() === "GET" ? "cms-read" : "authenticated"
}

export async function siteSettingsRateLimit(req: NextRequest) {
  return applyRateLimit(req, resolveSiteSettingsTier(req))
}
