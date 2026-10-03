import { SiteSettingsEntity } from "@/modules/site-settings/domain/entities/site-settings.entity"
import {
  ISetMaintenanceData,
  ISiteSettingsRepository,
} from "@/modules/site-settings/domain/repositories/site-settings.repository"
import {
  SITE_SETTINGS_KEY,
  SiteSettingsDocument,
} from "@/modules/site-settings/infrastructure/mongoose/site-settings.schema"
import { Model, Types } from "mongoose"

export class MongooseSiteSettingsRepository implements ISiteSettingsRepository {
  constructor(private readonly model: Model<SiteSettingsDocument>) {}

  private toEntity(doc: SiteSettingsDocument): SiteSettingsEntity {
    return new SiteSettingsEntity(
      String(doc._id),
      doc.maintenanceMode,
      doc.maintenanceMessage ?? null,
      doc.updatedBy
        ? {
            userId: doc.updatedBy.userId.toString(),
            name: doc.updatedBy.name,
          }
        : null,
      doc.updatedAt
    )
  }

  async find(): Promise<SiteSettingsEntity | null> {
    const doc = await this.model.findOne({ key: SITE_SETTINGS_KEY }).lean()
    return doc ? this.toEntity(doc as SiteSettingsDocument) : null
  }

  async setMaintenance(data: ISetMaintenanceData): Promise<SiteSettingsEntity> {
    // upsert: el primer toggle crea el documento único
    const doc = await this.model
      .findOneAndUpdate(
        { key: SITE_SETTINGS_KEY },
        {
          $set: {
            maintenanceMode: data.enabled,
            maintenanceMessage: data.message,
            updatedBy: {
              userId: new Types.ObjectId(data.updatedBy.userId),
              name: data.updatedBy.name,
            },
          },
        },
        {
          returnDocument: "after",
          upsert: true,
          setDefaultsOnInsert: true,
          runValidators: true,
        }
      )
      .lean()

    if (!doc) throw new Error("[SiteSettings] upsert no retornó documento")
    return this.toEntity(doc as SiteSettingsDocument)
  }
}
