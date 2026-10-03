import { SiteSettingsResponseDTO } from "@/modules/site-settings/application/dto/site-settings.dto"
import { SiteSettingsEntity } from "@/modules/site-settings/domain/entities/site-settings.entity"

export const SiteSettingsMapper = {
  toDTO(entity: SiteSettingsEntity): SiteSettingsResponseDTO {
    return {
      maintenanceMode: entity.maintenanceMode,
      maintenanceMessage: entity.maintenanceMessage,
      updatedBy: entity.updatedBy
        ? {
            userId: entity.updatedBy.userId,
            name: entity.updatedBy.name,
          }
        : null,
      updatedAt: entity.updatedAt?.toISOString() ?? null,
    }
  },
}
127418
