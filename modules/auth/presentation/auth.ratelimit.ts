import { RateLimitHeaders } from "@/lib/identity.helpers"
import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { resolveUserId } from "@/shared/infrastructure/auth/resolve-user-id"
import { NextRequest } from "next/server"

async function resolverAuthTier(req: NextRequest): Promise<RateLimitTier> {
  const path = req.nextUrl.pathname

  if (path.endsWith("/login") || path.endsWith("/seed")) {
    return "public-write"
  }

  const userId = await resolveUserId(req)
  return userId ? "cms-read" : "public"
}

export async function authRateLimit(req: NextRequest): Promise<{
  allowed: boolean
  response?: Response
  headers: RateLimitHeaders
}> {
  const tier = await resolverAuthTier(req)
  return applyRateLimit(req, tier)
}
