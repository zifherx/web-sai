import { SiteSettingsResponseDTO } from "@/modules/site-settings/application/dto/site-settings.dto"
import { SiteSettingsMapper } from "@/modules/site-settings/application/ports/site-settings.mapper"
import { SiteSettingsEntity } from "@/modules/site-settings/domain/entities/site-settings.entity"
import { ISiteSettingsRepository } from "@/modules/site-settings/domain/repositories/site-settings.repository"

export class GetSiteSettingsUseCase {
  constructor(private readonly repository: ISiteSettingsRepository) {}

  async execute(): Promise<SiteSettingsResponseDTO> {
    const settings =
      (await this.repository.find()) ?? SiteSettingsEntity.defaults()
    return SiteSettingsMapper.toDTO(settings)
  }
}
