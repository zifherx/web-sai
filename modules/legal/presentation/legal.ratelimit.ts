import { applyRateLimit } from "@/lib/rate-limit.guard"
import { type RateLimitTier } from "@/lib/rate-limit.middleware"
import { resolveUserId } from "@/shared/infrastructure/auth/resolve-user-id"
import { type NextRequest } from "next/server"

async function resolveLegalTier(req: NextRequest): Promise<RateLimitTier> {
  const method = req.method.toUpperCase()
  if (method !== "GET") return "authenticated"

  const userId = await resolveUserId(req)
  return userId ? "cms-read" : "public"
}

export async function legalRateLimit(req: NextRequest) {
  const tier = await resolveLegalTier(req)
  return applyRateLimit(req, tier)
}

export async function legalSeedRateLimit(req: NextRequest) {
  return applyRateLimit(req, "public-write")
}
