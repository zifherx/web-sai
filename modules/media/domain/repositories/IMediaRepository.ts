import type {
  EntityType,
  MediaFile,
} from "@/modules/media/domain/entities/MediaFile"

export interface FindManyFilters {
  entityType?: EntityType
  entityId?: string
  search?: string // búsqueda por fileName (insensible a mayúsculas)
  limit?: number
  offset?: number
}

export interface IMediaRepository {
  findById(id: string): Promise<MediaFile | null>
  findByFileKey(fileKey: string): Promise<MediaFile | null>
  findMany(filters?: FindManyFilters): Promise<MediaFile[]>
  findByEntity(entityType: EntityType, entityId: string): Promise<MediaFile[]>
  count(filters?: FindManyFilters): Promise<number>
  save(mediaFile: MediaFile): Promise<MediaFile>
  update(mediaFile: MediaFile): Promise<MediaFile>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
}
