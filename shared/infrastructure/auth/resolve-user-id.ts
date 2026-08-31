import { resolveSesion } from "@/shared/infrastructure/auth/resolve-sesion"
import { NextRequest } from "next/server"

export async function resolveUserId(req: NextRequest): Promise<string | null> {
  const sesion = await resolveSesion(req)
  return sesion?.usuarioId ?? null
}
