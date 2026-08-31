import { requireUsuarioSesion } from "@/lib/auth/get-usuario-sesion"
import { type Metadata } from "next"
import { redirect } from "next/navigation"
import { UsuariosView } from "./components/UsuariosView"

export const metadata: Metadata = {
  title: "Usuarios",
}

export default async function UsuariosPage() {
  const usuario = await requireUsuarioSesion()
  if (usuario.rol !== "admin") redirect("/cms/dashboard")

  return <UsuariosView />
}
