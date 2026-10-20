import { applyRateLimit } from "@/lib/rate-limit.guard"
import { type RateLimitTier } from "@/lib/rate-limit.middleware"
import { type NextRequest } from "next/server"

function resolveMediaTier(req: NextRequest): RateLimitTier {
  const isGet = req.method.toUpperCase() === "GET"
  return isGet ? "cms-read" : "authenticated"
}

export async function mediaRateLimit(req: NextRequest) {
  const tier = resolveMediaTier(req)
  return applyRateLimit(req, tier)
}
