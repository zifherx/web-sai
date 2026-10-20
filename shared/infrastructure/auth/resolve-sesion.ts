import { auth } from "@/modules/auth/infrastructure/config/better-auth.config"
import { type NextRequest } from "next/server"

export interface SesionUsuario {
  usuarioId: string
  nombre: string
  rol: string
}

const sesionPorRequest = new WeakMap<Request, Promise<SesionUsuario | null>>()

export function resolveSesion(req: NextRequest): Promise<SesionUsuario | null> {
  let pending = sesionPorRequest.get(req)
  if (!pending) {
    pending = cargarSesion(req)
    sesionPorRequest.set(req, pending)
  }
  return pending
}
async function cargarSesion(req: NextRequest): Promise<SesionUsuario | null> {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) return null
  return {
    usuarioId: session.user.id,
    nombre: session.user.name,
    rol: String(session.user.rol ?? ""),
  }
}
