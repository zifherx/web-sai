import { auth } from "@/modules/auth/infrastructure/config/better-auth.config"
import type { AuthUsuario, UsuarioRol } from "@/types/auth.types"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import "server-only"

export async function requireUsuarioSesion(): Promise<AuthUsuario> {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) redirect("/login")

  return {
    id: session.user.id,
    email: session.user.email,
    nombre: session.user.name,
    rol: session.user.rol as UsuarioRol,
    sedeId: session.user.sedeId ?? null,
  }
}
