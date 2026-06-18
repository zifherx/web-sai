import { RateLimitHeaders } from "@/lib/identity.helpers"
import { SystemEmailUnauthorizedError } from "@/modules/system-email/domain/errors/SystemEmailDomainError"
import { NextRequest } from "next/server"

export function resolveUserId(req: NextRequest): string {
  const userId = req.headers.get("x-clerk-user-id")
  if (!userId) throw new SystemEmailUnauthorizedError()
  return userId
}

export function withRateLimitHeaders(
  response: Response,
  rlHeaders: RateLimitHeaders
): Response {
  const next = new Response(response.body, response)
  Object.entries(rlHeaders).forEach(([k, v]) => next.headers.set(k, v))
  return next
}

export type IdContext = { params: Promise<{ id: string }> }
export type AreaContext = { params: Promise<{ area: string }> }
