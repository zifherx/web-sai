import { ForbiddenError, UnauthorizedError } from "@/shared/domain/auth-error"
import { type ContentAuthor } from "@/shared/domain/content-versioning/versioned-content"
import {
  hasPermission,
  type PermissionRequest,
} from "@/shared/infrastructure/auth/permissions"
import {
  resolveSesion,
  type SesionUsuario,
} from "@/shared/infrastructure/auth/resolve-sesion"
import { type NextRequest } from "next/server"

export type SesionAutorizada = SesionUsuario

export async function requireSesion(req: NextRequest): Promise<SesionUsuario> {
  const sesion = await resolveSesion(req)
  if (!sesion) throw new UnauthorizedError()
  return sesion
}

export async function requirePermission(
  req: NextRequest,
  request: PermissionRequest
): Promise<SesionUsuario> {
  const sesion = await requireSesion(req)
  if (!hasPermission(sesion.rol, request)) throw new ForbiddenError()
  return sesion
}

export function toContentAuthor(sesion: SesionAutorizada): ContentAuthor {
  return { userId: sesion.usuarioId, name: sesion.nombre }
}
