import { type RateLimitHeaders } from "@/lib/identity.helpers"
import { NextResponse } from "next/server"

export function withRateLimitHeaders(
  response: Response,
  rlHeaders: RateLimitHeaders
): NextResponse {
  const next = new NextResponse(response.body, response)
  for (const [key, value] of Object.entries(rlHeaders)) {
    next.headers.set(key, value)
  }
  return next
}
