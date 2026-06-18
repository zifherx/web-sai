import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

/**
 * Tier de rate limit para el módulo Media.
 *
 * - Mutaciones (POST, PATCH, DELETE): "authenticated" → 30 req/60s por userId
 * - Lecturas (GET): "cms-read" → 20 req/60s por userId
 *
 * No hay endpoint público de Media — todos requieren autenticación CMS.
 * Las subidas las maneja UploadThing directamente desde el cliente.
 */
function resolveMediaTier(req: NextRequest): RateLimitTier {
  const isGet = req.method.toUpperCase() === "GET"
  return isGet ? "cms-read" : "authenticated"
}

export async function mediaRateLimit(req: NextRequest) {
  const tier = resolveMediaTier(req)
  return applyRateLimit(req, tier)
}
