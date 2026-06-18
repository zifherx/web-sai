import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

function resolveMarcaTier(req: NextRequest): RateLimitTier {
  const method = req.method.toUpperCase()
  const isAuthenticated = Boolean(req.headers.get("x-clerk-user-id"))

  if (method !== "GET") return "authenticated"
  return isAuthenticated ? "cms-read" : "public"
}

export async function marcaRateLimit(req: NextRequest) {
  const tier = resolveMarcaTier(req)
  return applyRateLimit(req, tier)
}
