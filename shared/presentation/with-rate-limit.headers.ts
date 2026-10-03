import { RateLimitHeaders } from "@/lib/identity.helpers"
import { NextResponse } from "next/server"

export function withRateLimitHeaders(
  response: NextResponse,
  rlHeaders: RateLimitHeaders
): NextResponse {
  const next = new NextResponse(response.body, response)
  Object.entries(rlHeaders).forEach(([k, v]) => next.headers.set(k, v))
  return next
}
