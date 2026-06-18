import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

/**
 * Tier de rate limit para el módulo Novaly.
 *
 * El endpoint POST es público — lo llaman los formularios del frontend
 * para enviar leads de cotización a Novaly.
 * Tier "public-write" → 10 req/60s por IP.
 */
export async function novalyRateLimit(req: NextRequest) {
  const tier: RateLimitTier = "public-write"
  return applyRateLimit(req, tier)
}
