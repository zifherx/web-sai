import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

/**
 * Tier de rate limit para el módulo Email.
 *
 * Todos los endpoints son públicos — disparados desde formularios del frontend
 * (cita, reclamo, lead corporativo) sin autenticación Clerk.
 * Tier "public-write" → 10 req/60s por IP.
 */
export async function emailRateLimit(req: NextRequest) {
  const tier: RateLimitTier = "public-write"
  return applyRateLimit(req, tier)
}
