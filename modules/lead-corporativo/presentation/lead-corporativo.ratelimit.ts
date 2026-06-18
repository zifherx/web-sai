import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

/**
 * Tier de rate limit para el módulo LeadCorporativo.
 *
 * Patrón invertido — igual que Reclamo y Cita:
 *
 * - POST (registrar lead B2B): PÚBLICO — formulario del frontend sin auth.
 *   Tier "public-write" → 10 req/60s por IP (anti-spam del formulario).
 *
 * - GET (listar/detalle): solo CMS autenticado — datos comerciales sensibles.
 *   Tier "authenticated" → 30 req/60s por userId.
 */
function resolveLeadCorporativoTier(req: NextRequest): RateLimitTier {
  return req.method.toUpperCase() === "POST" ? "public-write" : "authenticated"
}

export async function leadCorporativoRateLimit(req: NextRequest) {
  const tier = resolveLeadCorporativoTier(req)
  return applyRateLimit(req, tier)
}
