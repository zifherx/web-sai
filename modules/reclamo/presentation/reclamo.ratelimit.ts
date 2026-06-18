import { NextRequest } from "next/server"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { applyRateLimit } from "@/lib/rate-limit.guard"

/**
 * Tier de rate limit para el módulo Reclamo.
 *
 * Difiere del patrón estándar de los otros módulos porque este módulo
 * tiene consumidores inversos:
 *
 * - POST (crear reclamo): endpoint PÚBLICO — cualquier cliente accede
 *   sin autenticación → tier "public-write" (10 req/60s por IP)
 *   Previene spam del formulario del libro de reclamaciones.
 *
 * - GET (listar/detalle): solo CMS autenticado → tier "authenticated"
 *   Los reclamos son datos sensibles; no se exponen públicamente.
 *
 * No existe un GET público de reclamos en este módulo.
 */
function resolveReclamoTier(req: NextRequest): RateLimitTier {
  const method = req.method.toUpperCase()
  if (method === "POST") return "public-write"
  return "authenticated"
}

export async function reclamoRateLimit(req: NextRequest) {
  const tier = resolveReclamoTier(req)
  return applyRateLimit(req, tier)
}
