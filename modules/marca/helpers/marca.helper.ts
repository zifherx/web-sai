import { RateLimitHeaders } from "@/lib/identity.helpers"
import { MarcaUnauthorizedError } from "@/modules/marca/domain/errors/MarcaDomainError"
import { NextRequest } from "next/server"

export function resolveUserId(req: NextRequest): string {
  const userId = req.headers.get("x-clerk-user-id")
  if (!userId) throw new MarcaUnauthorizedError()
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

export type RouteContext = { params: Promise<{ id: string }> }
export type SlugContext = { params: Promise<{ slug: string }> }
