import { LucideIcon } from "lucide-react"

export type UsuarioRol = "admin" | "editor" | "sede"

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthUsuario {
  id: string
  email: string
  nombre: string
  rol: UsuarioRol
  sedeId: string | null
}

export interface NavMenuItem {
  label: string
  slug: string
  icon: LucideIcon
  color: string
  hasSubmenu: boolean
  roles?: string[]
}

export interface CreateUsuarioPayload {
  email: string
  password: string
  nombre: string
  rol: UsuarioRol
  sedeId?: string
}
