import z from "zod"

export const MAINTENANCE_MESSAGE_MAX = 280

export const SetMaintenanceModeSchema = z.object({
  enabled: z.boolean(),
  message: z
    .string()
    .trim()
    .max(MAINTENANCE_MESSAGE_MAX)
    .nullish()
    .transform((v) => (v ? v : null)),
})

export type SetMaintenanceModeDto = z.infer<typeof SetMaintenanceModeSchema>

export interface SiteSettingsResponseDTO {
  maintenanceMode: boolean
  maintenanceMessage: string | null
  updatedBy: { userId: string; name: string } | null
  updatedAt: string | null
}
