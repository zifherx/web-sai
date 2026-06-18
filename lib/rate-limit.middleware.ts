import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

let redis: Redis | null = null

export function getRedis(): Redis {
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  }
  return redis
}

export type RateLimitTier =
  | "public"
  | "authenticated"
  | "cms-read"
  | "public-write"

export interface TierConfig {
  limit: number
  windowSeconds: number
  prefix: string
  algorithm: "sliding" | "fixed"
}

export const TIER_CONFIG: Record<RateLimitTier, TierConfig> = {
  public: {
    limit: 100,
    windowSeconds: 60,
    prefix: "rl:public",
    algorithm: "sliding",
  },
  authenticated: {
    limit: 30,
    windowSeconds: 60,
    prefix: "rl:authenticated",
    algorithm: "fixed",
  },
  "cms-read": {
    limit: 20,
    windowSeconds: 60,
    prefix: "rl:cmd-read",
    algorithm: "sliding",
  },
  "public-write": {
    limit: 10,
    windowSeconds: 60,
    prefix: "rl:public-write",
    algorithm: "sliding",
  },
}

// Cache de instancias Ratelimit por tier
const limiterCache = new Map<RateLimitTier, Ratelimit>()

export function getLimiter(tier: RateLimitTier): Ratelimit {
  if (!limiterCache.has(tier)) {
    const { limit, windowSeconds, algorithm, prefix } = TIER_CONFIG[tier]
    const window = `${windowSeconds} s` as const

    const limiter = new Ratelimit({
      redis: getRedis(),
      limiter:
        algorithm === "sliding"
          ? Ratelimit.slidingWindow(limit, window)
          : Ratelimit.fixedWindow(limit, window),
      /**
       * Ephemeral cache: si Redis no responde, permite el request
       * durante 5 segundos usando caché local. Fail-open intencional
       * para evitar que una caída de Redis rompa el frontend.
       */
      ephemeralCache: new Map(),
      prefix,
      analytics: true,
    })

    limiterCache.set(tier, limiter)
  }

  return limiterCache.get(tier)!
}
