import { RateLimitHeaders } from "@/lib/identity.helpers"

export function withRateLimitHeaders(
  response: Response,
  rlHeaders: RateLimitHeaders
): Response {
  const next = new Response(response.body, response)
  Object.entries(rlHeaders).forEach(([key, value]) =>
    next.headers.set(key, value)
  )
  return next
}
