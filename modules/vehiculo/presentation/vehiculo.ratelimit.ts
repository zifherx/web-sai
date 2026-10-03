import { resolveUserId } from "@/lib/identity.helpers"
import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

/**
 * Tier de rate limit para el módulo Vehículo:
 *
 * - Mutaciones (POST, PATCH, DELETE): "authenticated" → 30 req/60s por userId
 * - GET desde CMS (con userId):       "cms-read"      → 20 req/60s por userId
 * - GET público (frontend/ISR):       "public"        → 100 req/60s por IP
 */
async function resolveVehiculoTier(req: NextRequest): Promise<RateLimitTier> {
  const method = req.method.toUpperCase()
  if (method !== "GET") return "authenticated"

  const userId = await resolveUserId(req)
  return userId ? "cms-read" : "public"
}

export async function vehiculoRateLimit(req: NextRequest) {
  const tier = await resolveVehiculoTier(req)
  return applyRateLimit(req, tier)
}
