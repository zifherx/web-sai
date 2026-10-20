import {
  createAccessControl,
  type RoleAuthorizeRequest,
} from "better-auth/plugins/access"

export const statement = {
  siteSettings: ["read", "update"],
  legalPage: ["read", "update", "publish", "restore"],
  legalPromotion: ["read", "create", "update", "publish", "restore", "delete"],
  vehicleLegalNote: ["read", "update", "publish", "restore"],
} as const

export const ac = createAccessControl(statement)

export const ROLES = {
  admin: ac.newRole({
    siteSettings: ["read", "update"],
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
  }),

  editorLegal: ac.newRole({
    legalPage: ["read", "update", "publish", "restore"],
    legalPromotion: ["read", "create", "update", "publish", "restore"],
    vehicleLegalNote: ["read", "update", "publish", "restore"],
  }),

  editor: ac.newRole({}),
  sede: ac.newRole({}),
}

export type RolUsuario = keyof typeof ROLES
export const ROLES_USUARIO = Object.keys(ROLES) as RolUsuario[]

export type PermissionRequest = RoleAuthorizeRequest<typeof statement>

export function isRolUsuario(value: unknown): value is RolUsuario {
  return typeof value === "string" && Object.hasOwn(ROLES, value)
}

export function hasPermission(
  rol: unknown,
  request: PermissionRequest
): boolean {
  if (!isRolUsuario(rol)) return false
  return ROLES[rol].authorize(request).success
}
