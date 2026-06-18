import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

/**
 * Tier de rate limit para el módulo Cita.
 *
 * Igual que Reclamo — patrón inverso al resto de módulos:
 *
 * - POST (agendar cita): endpoint PÚBLICO — clientes del frontend sin auth.
 *   Tier "public-write" → 10 req/60s por IP.
 *
 * - GET (listar/detalle): solo CMS autenticado.
 *   Tier "authenticated" → 30 req/60s por userId.
 */
function resolveCitaTier(req: NextRequest): RateLimitTier {
  return req.method.toUpperCase() === "POST" ? "public-write" : "authenticated"
}

export async function citaRateLimit(req: NextRequest) {
  const tier = resolveCitaTier(req)
  return applyRateLimit(req, tier)
}
