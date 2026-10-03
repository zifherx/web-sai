import { ForbiddenError, UnauthorizedError } from "@/shared/domain/auth-error"
import { ContentAuthor } from "@/shared/domain/content-versioning/versioned-content"
import {
  hasPermission,
  PermissionRequest,
} from "@/shared/infrastructure/auth/permissions"
import { resolveSesion } from "@/shared/infrastructure/auth/resolve-sesion"
import { NextRequest } from "next/server"

export interface SesionAutorizada {
  usuarioId: string
  nombre: string
  rol: string
}

/**
 * Guard de autorización para controllers.
 *
 *  - Sin sesión            → `UnauthorizedError` (401)
 *  - Sesión sin el permiso → `ForbiddenError`    (403)
 *
 * `withHandler` mapea ambos al status correcto (son `DomainError`).
 * Los casos de uso NO conocen better-auth: reciben un `ContentAuthor`.
 */
export async function requirePermission(
  req: NextRequest,
  request: PermissionRequest
): Promise<SesionAutorizada> {
  const sesion = await resolveSesion(req)
  if (!sesion) throw new UnauthorizedError()
  if (!hasPermission(sesion.rol, request)) throw new ForbiddenError()
  return sesion
}

export function toContentAuthor(sesion: SesionAutorizada): ContentAuthor {
  return { userId: sesion.usuarioId, name: sesion.nombre }
}
