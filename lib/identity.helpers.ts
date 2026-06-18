import { RateLimitTier, TIER_CONFIG } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

/**
 * Extrae el userId de Clerk del header inyectado por el middleware.
 * Retorna null si el request no está autenticado.
 */
export function resolveUserId(req: NextRequest): string | null {
  return req.headers.get("x-clerk-user-id")
}

/**
 * Extrae la IP del request, considerando proxies (Vercel, Cloudflare).
 * Fallback a "anonymous" para no romper el limiter.
 */
export function resolveIp(req: NextRequest): string {
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("cf-connecting-ip") ??
    "anonymous"
  )
}

export interface RateLimitHeaders {
  "X-RateLimit-Limit": string
  "X-RateLimit-Remaining": string
  "X-RateLimit-Reset": string
}

export function buildHeaders(
  tier: RateLimitTier,
  remaining: number,
  reset: number
): RateLimitHeaders {
  return {
    "X-RateLimit-Limit": String(TIER_CONFIG[tier].limit),
    "X-RateLimit-Remaining": String(Math.max(0, remaining)),
    "X-RateLimit-Reset": String(Math.ceil(reset / 1000)), // epoch en segundos
  }
}

// ── Respuesta 429 ─────────────────────────────────────────────────────────────

export function tooManyRequests(
  tier: RateLimitTier,
  remaining: number,
  reset: number
): Response {
  const headers = buildHeaders(tier, remaining, reset)
  const retryAfter = Math.ceil((reset - Date.now()) / 1000)

  return Response.json(
    {
      success: false,
      message: "Demasiadas solicitudes. Intenta de nuevo más tarde.",
      retryAfter,
    },
    {
      status: 429,
      headers: {
        ...headers,
        "Retry-After": String(retryAfter),
        "Content-Type": "application/json",
      },
    }
  )
}
