import {
  SetMaintenanceModeDto,
  SiteSettingsResponseDTO,
} from "@/modules/site-settings/application/dto/site-settings.dto"
import { SiteSettingsMapper } from "@/modules/site-settings/application/ports/site-settings.mapper"
import { ISiteSettingsRepository } from "@/modules/site-settings/domain/repositories/site-settings.repository"
import { ContentAuthor } from "@/shared/domain/content-versioning/versioned-content"

export class SetMaintenanceModeUseCase {
  constructor(private readonly repository: ISiteSettingsRepository) {}

  async execute(
    dto: SetMaintenanceModeDto,
    author: ContentAuthor
  ): Promise<SiteSettingsResponseDTO> {
    const updated = await this.repository.setMaintenance({
      enabled: dto.enabled,
      message: dto.enabled ? dto.message : null,
      updatedBy: author,
    })
    return SiteSettingsMapper.toDTO(updated)
  }
}
