import { RateLimitHeaders } from "@/lib/identity.helpers"
import { NextRequest } from "next/server"
import { CarroceriaUnauthorizedError } from "../domain/errors/CarroceriaDomainError"

export const resolveUserId = (req: NextRequest): string => {
  const userId = req.headers.get("x-clerk-user-id")
  if (!userId) throw new CarroceriaUnauthorizedError()
  return userId
}

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
