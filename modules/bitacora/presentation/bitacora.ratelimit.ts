import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

/**
 * Tier de rate limit para el módulo Bitácora.
 * Todos los endpoints son solo CMS — datos internos de auditoría.
 *
 * - GET: "cms-read" → 20 req/60s por userId
 */
function resolveBitacoraTier(_req: NextRequest): RateLimitTier {
  return "cms-read"
}

export async function bitacoraRateLimit(req: NextRequest) {
  const tier = resolveBitacoraTier(req)
  return applyRateLimit(req, tier)
}
