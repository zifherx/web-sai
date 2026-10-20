import {
  buildHeaders,
  type RateLimitHeaders,
  resolveIp,
  tooManyRequests,
} from "@/lib/identity.helpers"
import { getLimiter, type RateLimitTier } from "@/lib/rate-limit.middleware"
import { resolveUserId } from "@/shared/infrastructure/auth/resolve-user-id"
import { type NextRequest } from "next/server"

export type RateLimitResult =
  | { allowed: true; headers: RateLimitHeaders }
  | { allowed: false; response: Response; headers: RateLimitHeaders }

export function resolveDefaultTier(
  method: string,
  isAuthenticated: boolean
): RateLimitTier {
  if (method.toUpperCase() !== "GET") return "authenticated"
  return isAuthenticated ? "cms-read" : "public"
}

export async function applyRateLimit(
  req: NextRequest,
  tier: RateLimitTier,
  userId?: string | null
): Promise<RateLimitResult> {
  const limiter = getLimiter(tier)
  const ip = resolveIp(req)
  const uid = userId === undefined ? await resolveUserId(req) : userId

  const key =
    tier === "public" ? `public:${ip}` : uid ? `user:${uid}` : `ip:${ip}`

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
