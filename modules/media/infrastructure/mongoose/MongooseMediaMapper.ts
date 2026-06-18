/**
 * INFRASTRUCTURE — MongooseMediaMapper
 *
 * Convierte entre el documento Mongoose (MediaRecordDocument)
 * y la entidad de dominio (MediaFile).
 * Aísla la capa de dominio de los tipos de Mongoose.
 */
import { MediaFile } from "@/modules/media/domain/entities/MediaFile"
import type { MediaRecordDocument } from "@/modules/media/infrastructure/mongoose/MediaRecord.model"

export class MongooseMediaMapper {
  static toDomain(doc: MediaRecordDocument): MediaFile {
    return new MediaFile({
      id: doc._id.toString(),
      fileKey: doc.fileKey,
      fileUrl: doc.fileUrl,
      fileName: doc.fileName,
      fileSize: doc.fileSize,
      fileType: doc.fileType,
      entityType: doc.entityType,
      entityId: doc.entityId,
      fieldName: doc.fieldName,
      uploadedBy: doc.uploadedBy,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    })
  }

  static toDomainList(docs: MediaRecordDocument[]): MediaFile[] {
    return docs.map(MongooseMediaMapper.toDomain)
  }
}
