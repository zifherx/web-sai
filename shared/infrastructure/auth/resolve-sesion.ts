import { auth } from "@/modules/auth/infrastructure/config/better-auth.config"
import { NextRequest } from "next/server"

export async function resolveSesion(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) return null

  return {
    usuarioId: session.user.id,
    nombre: session.user.name,
    rol: String(session.user.rol ?? ""),
  }
}
