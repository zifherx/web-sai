import { RateLimitHeaders } from "@/lib/identity.helpers"
import { NextResponse } from "next/server"

export type IdContext = { params: Promise<{ id: string }> }

export function withRateLimitHeaders(
  response: NextResponse,
  rlHeaders: RateLimitHeaders
): NextResponse {
  Object.entries(rlHeaders).forEach(([k, v]) => response.headers.set(k, v))
  return response
}
