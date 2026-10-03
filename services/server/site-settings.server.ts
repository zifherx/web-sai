import { siteSettingsFactory } from "@/modules/site-settings/factories/site-settings.factory"
import { SITE_SETTINGS_TAG } from "@/modules/site-settings/presentation/site-settings.cache"
import { connectDB } from "@/shared/infrastructure/connection"
import { unstable_cache } from "next/cache"

export interface MaintenanceStatus {
  enabled: boolean
  message: string | null
  source: "env" | "db" | "fallback"
}

/**
 * Adaptador de entrada para Server Components (equivalente al controller,
 * pero sin HTTP). Lectura cacheada: NO toca Mongo en cada request.
 * - Se invalida con revalidateTag(SITE_SETTINGS_TAG) desde el controller.
 * - `revalidate` es solo red de seguridad si alguien edita la BD a mano.
 */
const getCachedMaintenance = unstable_cache(
  async () => {
    await connectDB()
    const { get } = siteSettingsFactory()
    const { maintenanceMode, maintenanceMessage } = await get.execute()
    return { enabled: maintenanceMode, message: maintenanceMessage }
  },
  ["site-settings:maintenance"],
  { tags: [SITE_SETTINGS_TAG], revalidate: 300 }
)

export const siteSettingsServerService = {
  getMaintenanceStatus: async (): Promise<MaintenanceStatus> => {
    const force = process.env.MAINTENANCE_FORCE?.toLowerCase()
    if (force === "on") return { enabled: true, message: null, source: "env" }
    if (force === "off") return { enabled: false, message: null, source: "env" }

    try {
      const { enabled, message } = await getCachedMaintenance()
      return { enabled, message, source: "db" }
    } catch (err) {
      console.error(
        "[siteSettingsServerService] getMaintenanceStatus falló:",
        err
      )
      return { enabled: false, message: null, source: "fallback" }
    }
  },
}
