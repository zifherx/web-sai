import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

/**
 * Determina el tier de rate limit para el módulo Sede:
 *
 * - Mutaciones (POST, PATCH, DELETE): "authenticated" → 30 req/60s por userId
 * - GET desde CMS (con userId):       "cms-read"      → 20 req/60s por userId
 * - GET público (frontend/ISR):       "public"        → 100 req/60s por IP
 */
function resolveSedeTier(req: NextRequest): RateLimitTier {
  const method = req.method.toUpperCase()
  const isAuthenticated = Boolean(req.headers.get("x-clerk-user-id"))

  if (method !== "GET") return "authenticated"
  return isAuthenticated ? "cms-read" : "public"
}

export async function sedeRateLimit(req: NextRequest) {
  const tier = resolveSedeTier(req)
  return applyRateLimit(req, tier)
}
