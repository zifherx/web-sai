import { RateLimitHeaders } from "@/lib/identity.helpers"
import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { resolveUserId } from "@/shared/infrastructure/auth/resolve-user-id"
import { NextRequest } from "next/server"

async function resolveUsuaiorsTier(req: NextRequest): Promise<RateLimitTier> {
  if (req.method !== "GET") return "authenticated"

  const userId = await resolveUserId(req)
  return userId ? "cms-read" : "public"
}

export async function usuariosRateLimit(req: NextRequest): Promise<{
  allowed: boolean
  response?: Response
  headers: RateLimitHeaders
}> {
  const tier = await resolveUsuaiorsTier(req)
  return applyRateLimit(req, tier)
}
