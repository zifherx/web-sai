import type { MediaFileResponseDto } from "@/modules/media/application/dtos/media.dto"
import type { MediaFile } from "@/modules/media/domain/entities/MediaFile"

export class MediaFileMapper {
  static toResponseDto(entity: MediaFile): MediaFileResponseDto {
    return {
      id: entity.id,
      fileKey: entity.fileKey,
      fileUrl: entity.fileUrl,
      fileName: entity.fileName,
      fileSize: entity.fileSize,
      fileType: entity.fileType,
      entityType: entity.entityType,
      entityId: entity.entityId,
      fieldName: entity.fieldName,
      isAssigned: entity.isAssigned(),
      uploadedBy: entity.uploadedBy,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    }
  }

  static toResponseDtoList(entities: MediaFile[]): MediaFileResponseDto[] {
    return entities.map(MediaFileMapper.toResponseDto)
  }
}
