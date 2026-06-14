import { ResponseFactory } from "@/lib"
import { NextRequest } from "next/server"

type Handler = () => Promise<Response>

export function withHandler(handler: Handler): Promise<Response> {
  return handler().catch((err: unknown) => ResponseFactory.error(err))
}

export type { NextRequest }
