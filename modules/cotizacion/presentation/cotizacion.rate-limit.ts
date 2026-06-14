import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

/**
 * Tier de rate limit para el módulo Cotizacion.
 *
 * Patrón invertido — igual que Reclamo, Cita y LeadCorporativo:
 *
 * - POST (enviar cotización): PÚBLICO — clientes acceden sin auth desde el wizard.
 *   Tier "public-write" → 10 req/60s por IP.
 *
 * - GET (listar/detalle): solo CMS autenticado — datos personales de clientes.
 *   Tier "authenticated" → 30 req/60s por userId.
 */
function resolveCotizacionTier(req: NextRequest): RateLimitTier {
  return req.method.toUpperCase() === "POST" ? "public-write" : "authenticated"
}

export async function cotizacionRateLimit(req: NextRequest) {
  const tier = resolveCotizacionTier(req)
  return applyRateLimit(req, tier)
}
