import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { resolveUserId } from "@/shared/infrastructure/auth/resolve-user-id"
import { NextRequest } from "next/server"

async function resolvePortadaTier(req: NextRequest): Promise<RateLimitTier> {
  const method = req.method.toUpperCase()
  if (method !== "GET") return "authenticated"

  const userId = await resolveUserId(req)
  return userId ? "cms-read" : "public"
}

export async function portadaRateLimit(req: NextRequest) {
  const tier = await resolvePortadaTier(req)
  return applyRateLimit(req, tier)
}
