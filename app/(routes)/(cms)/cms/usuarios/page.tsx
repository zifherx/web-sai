import { UsuariosView } from "@/app/(routes)/(cms)/cms/usuarios/components/UsuariosView"
import { requireUsuarioSesion } from "@/lib/auth/get-usuario-sesion"
import { type Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Usuarios",
}

export default async function UsuariosPage() {
  const usuario = await requireUsuarioSesion()
  if (usuario.rol !== "admin") redirect("/cms/dashboard")

  return <UsuariosView />
}
