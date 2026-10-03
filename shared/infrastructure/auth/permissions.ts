import {
  createAccessControl,
  type RoleAuthorizeRequest,
} from "better-auth/plugins/access"

/**
 * Matriz de permisos del CMS (RBAC).
 *
 * Se usa `createAccessControl` de better-auth como librería PURA de matriz
 * (sin registrar el plugin `admin`): el rol sigue viviendo en el campo
 * `user.rol` que ya existe en la colección `user`. Así no hay migración de
 * `rol` → `role`, ni se exponen los endpoints extra del plugin (ban,
 * impersonate…), ni aparece el issue de tipos #8855 del plugin admin.
 *
 * Archivo isomórfico: el frontend puede importarlo para ocultar acciones
 * (cosmético). La autorización real es `requirePermission` en el servidor.
 */
export const statement = {
  legalPage: ["read", "update", "publish", "restore"],
  legalPromotion: ["read", "create", "update", "publish", "restore", "delete"],
  vehicleLegalNote: ["read", "update", "publish", "restore"],
  siteSettings: ["read", "update"],
} as const

export const ac = createAccessControl(statement)

export const ROLES = {
  admin: ac.newRole({
    legalPage: ["read", "update", "publish", "restore"],
    legalPromotion: [
      "read",
      "create",
      "update",
      "publish",
      "restore",
      "delete",
    ],
    vehicleLegalNote: ["read", "update", "publish", "restore"],
    siteSettings: ["read", "update"],
  }),

  /**
   * Pendientes de negocio (informe §12):
   *  - P2: ¿puede publicar? → hoy SÍ. Para "solo borradores", quitar "publish".
   *  - P3: ¿puede eliminar campañas? → hoy NO (solo desactivarlas).
   */
  editorLegal: ac.newRole({
    legalPage: ["read", "update", "publish", "restore"],
    legalPromotion: ["read", "create", "update", "publish", "restore"],
    vehicleLegalNote: ["read", "update", "publish", "restore"],
  }),

  // Roles existentes: sin acceso al módulo Legal.
  editor: ac.newRole({}),
  sede: ac.newRole({}),
}

export type RolUsuario = keyof typeof ROLES
export const ROLES_USUARIO = Object.keys(ROLES) as RolUsuario[]

export type PermissionRequest = RoleAuthorizeRequest<typeof statement>

export function isRolUsuario(value: unknown): value is RolUsuario {
  return typeof value === "string" && Object.hasOwn(ROLES, value)
}

/** `true` si el rol tiene TODAS las acciones pedidas. */
export function hasPermission(
  rol: unknown,
  request: PermissionRequest
): boolean {
  if (!isRolUsuario(rol)) return false
  return ROLES[rol].authorize(request).success
}
