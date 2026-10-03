import { ResponseFactory } from "@/lib/response-factory"
import { SetMaintenanceModeSchema } from "@/modules/site-settings/application/dto/site-settings.dto"
import { siteSettingsFactory } from "@/modules/site-settings/factories/site-settings.factory"
import { SITE_SETTINGS_TAG } from "@/modules/site-settings/presentation/site-settings.cache"
import { siteSettingsRateLimit } from "@/modules/site-settings/presentation/site-settings.ratelimit"
import { ForbiddenError } from "@/shared/domain/auth-error"
import {
  requirePermission,
  SesionAutorizada,
  toContentAuthor,
} from "@/shared/infrastructure/auth/require-permission"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { withRateLimitHeaders } from "@/shared/presentation/with-rate-limit.headers"
import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

/**
 * Doble candado:
 * 1. RBAC → `siteSettings` (solo rol admin), igual que el resto del CMS.
 * 2. MAINTENANCE_OWNER_IDS (opcional) → userIds de Ziphonex separados por coma.
 *    Si está definido, aunque el cliente tenga usuarios con rol admin, no
 *    podrán tocar el modo mantenimiento. Si está vacío, aplica solo RBAC.
 */
async function requireSiteSettings(
  req: NextRequest,
  action: "read" | "update"
): Promise<SesionAutorizada> {
  const sesion = await requirePermission(req, {
    siteSettings: [action],
  })

  const owners = (process.env.MAINTENANCE_OWNER_IDS ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)

  if (owners.length > 0 && !owners.includes(sesion.usuarioId)) {
    throw new ForbiddenError()
  }

  return sesion
}

/**
 * GET /api/site-settings/maintenance
 *
 * Estado actual del modo mantenimiento. Solo CMS.
 * El sitio público NO consume este endpoint: lee vía maintenance.server.ts.
 */
export function getMaintenanceHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await siteSettingsRateLimit(req)
    if (!rl.allowed) return rl.response!

    await requireSiteSettings(req, "read")
    await connectDB()
    const data = await siteSettingsFactory().get.execute()

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Configuración obtenida"),
      rl.headers
    )
  })
}

/**
 * PATCH /api/site-settings/maintenance
 *
 * Activa/desactiva el modo mantenimiento. Solo CMS.
 * Invalida la caché del sitio público en el mismo request.
 */
export function setMaintenanceHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await siteSettingsRateLimit(req)
    if (!rl.allowed) return rl.response!

    const sesion = await requireSiteSettings(req, "update")
    const body = SetMaintenanceModeSchema.parse(await req.json())
    await connectDB()
    const data = await siteSettingsFactory().setMaintenance.execute(
      body,
      toContentAuthor(sesion)
    )

    // En Route Handlers no existe updateTag (solo Server Actions).
    // { expire: 0 } = expiración inmediata, sin servir una versión stale.
    revalidateTag(SITE_SETTINGS_TAG, { expire: 0 })
    // Las páginas públicas pueden estar prerenderizadas (ISR)
    revalidatePath("/", "layout")

    return withRateLimitHeaders(
      ResponseFactory.success(
        data,
        data.maintenanceMode
          ? "Modo mantenimiento activado"
          : "Modo mantenimiento desactivado"
      ),
      rl.headers
    )
  })
}
