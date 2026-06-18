import {
  buildHeaders,
  RateLimitHeaders,
  resolveIp,
  resolveUserId,
  tooManyRequests,
} from "@/lib/identity.helpers"
import { getLimiter, RateLimitTier } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

export interface RateLimitResult {
  /** true = request permitido, false = bloqueado (429) */
  allowed: boolean
  /** Response lista para retornar si allowed=false */
  response?: Response
  /** Headers informativos para añadir a la respuesta exitosa */
  headers: RateLimitHeaders
}

/**
 * Aplica rate limit al request entrante.
 *
 * @param req     - NextRequest de la ruta
 * @param tier    - Tier de configuración a aplicar
 *
 * Para el tier "authenticated" y "cms-read" con userId presente,
 * la key es `userId`. Para requests sin auth o tier "public", la key es la IP.
 */
export async function applyRateLimit(
  req: NextRequest,
  tier: RateLimitTier
): Promise<RateLimitResult> {
  const limiter = getLimiter(tier)

  // Determinar la key de identificación
  const userId = resolveUserId(req)
  const ip = resolveIp(req)

  const key =
    tier === "public" ? `public:${ip}` : userId ? `user:${userId}` : `ip:${ip}`

  const { success, remaining, reset } = await limiter.limit(key)
  const headers = buildHeaders(tier, remaining, reset)

  if (!success) {
    return {
      allowed: false,
      response: tooManyRequests(tier, remaining, reset),
      headers,
    }
  }

  return { allowed: true, headers }
}
