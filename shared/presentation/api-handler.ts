import { applyRateLimit, resolveDefaultTier } from "@/lib/rate-limit.guard"
import { type RateLimitTier } from "@/lib/rate-limit.middleware"
import { ForbiddenError, UnauthorizedError } from "@/shared/domain/auth-error"
import {
  hasPermission,
  type PermissionRequest,
} from "@/shared/infrastructure/auth/permissions"
import {
  resolveSesion,
  type SesionUsuario,
} from "@/shared/infrastructure/auth/resolve-sesion"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { withRateLimitHeaders } from "@/shared/presentation/with-rate-limit.headers"
import { type NextRequest } from "next/server"

/**
 * Quién puede llamar la ruta:
 *  - "public"        → cualquiera (sitio público, formularios)
 *  - "authenticated" → cualquier usuario con sesión
 *  - { recurso: [acciones] } → sesión + permiso de `permissions.ts`
 */
export type ApiAccess = "public" | "authenticated" | PermissionRequest

export interface ApiHandlerOptions<A extends ApiAccess> {
  access: A
  tier?: RateLimitTier
  db?: boolean
}

type SesionFor<A extends ApiAccess> = A extends "public"
  ? SesionUsuario | null
  : SesionUsuario

export interface ApiContext<A extends ApiAccess> {
  sesion: SesionFor<A>
}

export function apiHandler<A extends ApiAccess>(
  req: NextRequest,
  options: ApiHandlerOptions<A>,
  action: (ctx: ApiContext<A>) => Promise<Response>
): Promise<Response> {
  return withHandler(async () => {
    const sesion = await resolveSesion(req)

    const tier = options.tier ?? resolveDefaultTier(req.method, sesion !== null)
    const rl = await applyRateLimit(req, tier, sesion?.usuarioId ?? null)
    if (!rl.allowed) return rl.response

    authorize(options.access, sesion)

    if (options.db !== false) await connectDB()
    const response = await action({ sesion: sesion as SesionFor<A> })
    return withRateLimitHeaders(response, rl.headers)
  })
}

function authorize(access: ApiAccess, sesion: SesionUsuario | null): void {
  if (access === "public") return
  if (!sesion) throw new UnauthorizedError()
  if (access === "authenticated") return
  if (!hasPermission(sesion.rol, access)) throw new ForbiddenError()
}
