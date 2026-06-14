import { RateLimitHeaders } from "@/lib/identity.helpers"
import { NextRequest } from "next/server"
import { VehiculoUnauthorizedError } from "../domain/errors/VehiculoDomainError"

export function resolveUserId(req: NextRequest): string {
  const userId = req.headers.get("x-clerk-user-id")
  if (!userId) throw new VehiculoUnauthorizedError()
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
export type SlugContext = { params: Promise<{ slug: string }> }
export type MarcaContext = { params: Promise<{ marcaId: string }> }
