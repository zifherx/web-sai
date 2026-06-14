import type { MediaFile } from "@/modules/media/domain/entities/MediaFile"
import { MediaFileNotFoundError } from "@/modules/media/domain/errors/MediaDomainError"
import type {
  FindManyFilters,
  IMediaRepository,
} from "@/modules/media/domain/repositories/IMediaRepository"
import { MediaRecordModel } from "@/modules/media/infrastructure/mongoose/MediaRecord.model"
import { MongooseMediaMapper } from "@/modules/media/infrastructure/mongoose/MongooseMediaMapper"

export class MongooseMediaRepository implements IMediaRepository {
  // Queries
  async findById(id: string): Promise<MediaFile | null> {
    const doc = await MediaRecordModel.findById(id).lean()
    if (!doc) return null
    return MongooseMediaMapper.toDomain(doc)
  }

  async findByFileKey(fileKey: string): Promise<MediaFile | null> {
    const doc = await MediaRecordModel.findOne({ fileKey }).lean()
    if (!doc) return null
    return MongooseMediaMapper.toDomain(doc)
  }

  async findMany(filters: FindManyFilters = {}): Promise<MediaFile[]> {
    const query = this.buildQuery(filters)
    const docs = await MediaRecordModel.find(query)
      .sort({ createdAt: -1 })
      .skip(filters.offset ?? 0)
      .limit(filters.limit ?? 50)
      .lean()
    return MongooseMediaMapper.toDomainList(docs)
  }

  async findByEntity(
    entityType: string,
    entityId: string
  ): Promise<MediaFile[]> {
    const docs = await MediaRecordModel.find({ entityType, entityId })
      .sort({ createdAt: -1 })
      .lean()
    return MongooseMediaMapper.toDomainList(docs)
  }

  async count(filters: FindManyFilters = {}): Promise<number> {
    const query = this.buildQuery(filters)
    return MediaRecordModel.countDocuments(query)
  }

  // Commands

  async save(mediaFile: MediaFile): Promise<MediaFile> {
    const props = mediaFile.toProps()
    const doc = await MediaRecordModel.create({
      fileKey: props.fileKey,
      fileUrl: props.fileUrl,
      fileName: props.fileName,
      fileSize: props.fileSize,
      fileType: props.fileType,
      entityType: props.entityType,
      entityId: props.entityId,
      fieldName: props.fieldName,
      uploadedBy: props.uploadedBy,
    })
    return MongooseMediaMapper.toDomain(doc.toObject())
  }

  async update(mediaFile: MediaFile): Promise<MediaFile> {
    const props = mediaFile.toProps()
    const doc = await MediaRecordModel.findByIdAndUpdate(
      props.id,
      {
        $set: {
          entityType: props.entityType,
          entityId: props.entityId,
          fieldName: props.fieldName,
          updatedAt: props.updatedAt,
        },
      },
      { after: true, runValidators: true }
    ).lean()

    if (!doc) throw new MediaFileNotFoundError(props.id)
    return MongooseMediaMapper.toDomain(doc)
  }

  async delete(id: string): Promise<void> {
    await MediaRecordModel.findByIdAndDelete(id)
  }

  async deleteMany(ids: string[]): Promise<void> {
    await MediaRecordModel.deleteMany({ _id: { $in: ids } })
  }

  // ─── Helpers privados ─────────────────────────────────────────────────────

  private buildQuery(filters: FindManyFilters): Record<string, unknown> {
    const query: Record<string, unknown> = {}

    if (filters.entityType) {
      query.entityType = filters.entityType
    }
    if (filters.entityId) {
      query.entityId = filters.entityId
    }
    if (filters.search) {
      query.fileName = { $regex: filters.search, $options: "i" }
    }

    return query
  }
}
