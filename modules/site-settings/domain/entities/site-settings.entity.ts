import { ContentAuthor } from "@/shared/domain/content-versioning/versioned-content"

export class SiteSettingsEntity {
  constructor(
    public readonly id: string,
    public readonly maintenanceMode: boolean,
    public readonly maintenanceMessage: string | null,
    public readonly updatedBy: ContentAuthor | null,
    public readonly updatedAt?: Date | null
  ) {}

  static defaults(): SiteSettingsEntity {
    return new SiteSettingsEntity("default", false, null, null, null)
  }
}
