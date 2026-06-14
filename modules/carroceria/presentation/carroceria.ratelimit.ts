import { RateLimitHeaders } from "@/lib/identity.helpers"
import { applyRateLimit } from "@/lib/rate-limit.guard"
import { RateLimitTier } from "@/lib/rate-limit.middleware"
import { NextRequest } from "next/server"

function resolveCarroceriaTier(req: NextRequest): RateLimitTier {
  const method = req.method.toUpperCase()
  const isAuthenticated = Boolean(req.headers.get("x-clerk-user-id"))

  if (method !== "GET") return "authenticated"
  return isAuthenticated ? "cms-read" : "public"
}

export async function carroceriaRateLimit(req: NextRequest): Promise<{
  allowed: boolean
  response?: Response
  headers: RateLimitHeaders
}> {
  const tier = resolveCarroceriaTier(req)
  return applyRateLimit(req, tier)
}
