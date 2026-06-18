import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

function resolvePortadaTier(req: NextRequest): RateLimitTier {
  const method = req.method.toUpperCase()
  const isAuthenticated = Boolean(req.headers.get("x-clerk-user-id"))

  if (method !== "GET") return "authenticated"
  return isAuthenticated ? "cms-read" : "public"
}

export async function portadaRateLimit(req: NextRequest) {
  const tier = resolvePortadaTier(req)
  return applyRateLimit(req, tier)
}
