import { IRol } from "@/modules/auth/application/ports/i-user-repository.port"
import { auth } from "@/modules/auth/infrastructure/config/better-auth.config"
import { NextRequest } from "next/server"

export async function resolveSesion(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) return null

  return {
    usuarioId: session.user.id,
    rol: session.user.rol as IRol,
  }
}
