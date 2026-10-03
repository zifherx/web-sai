import { GetSiteSettingsUseCase } from "@/modules/site-settings/application/use-cases/get-site-settings.use-case"
import { SetMaintenanceModeUseCase } from "@/modules/site-settings/application/use-cases/set-maintenance-mode.use-case"
import { MongooseSiteSettingsRepository } from "@/modules/site-settings/infrastructure/mongoose/site-settings-repository"
import { SiteSettingsModel } from "@/modules/site-settings/infrastructure/mongoose/site-settings.schema"

export function siteSettingsFactory() {
  const repository = new MongooseSiteSettingsRepository(SiteSettingsModel)

  return {
    get: new GetSiteSettingsUseCase(repository),
    setMaintenance: new SetMaintenanceModeUseCase(repository),
  }
}
