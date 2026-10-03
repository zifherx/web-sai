import { SiteSettingsEntity } from "@/modules/site-settings/domain/entities/site-settings.entity"
import { ContentAuthor } from "@/shared/domain/content-versioning/versioned-content"

export interface ISetMaintenanceData {
  enabled: boolean
  message: string | null
  updatedBy: ContentAuthor
}

export interface ISiteSettingsRepository {
  find(): Promise<SiteSettingsEntity | null>
  setMaintenance(params: ISetMaintenanceData): Promise<SiteSettingsEntity>
}
