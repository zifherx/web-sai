import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

/**
 * Tier de rate limit para el módulo SystemEmail.
 *
 * A diferencia de Reclamo/Cita/Cotizacion, este módulo es de configuración
 * interna — TODOS los endpoints requieren autenticación CMS.
 *
 * - Mutaciones (POST): "authenticated" → 30 req/60s por userId
 * - Lecturas (GET):    "cms-read"      → 20 req/60s por userId
 */
function resolveSystemEmailTier(req: NextRequest): RateLimitTier {
  const isAuthenticated = Boolean(req.headers.get("x-clerk-user-id"))
  const isGet = req.method.toUpperCase() === "GET"

  // Protección mínima incluso si no hay userId — cae a rate limit por IP
  if (isGet) return isAuthenticated ? "cms-read" : "public"
  return "authenticated"
}

export async function systemEmailRateLimit(req: NextRequest) {
  const tier = resolveSystemEmailTier(req)
  return applyRateLimit(req, tier)
}
