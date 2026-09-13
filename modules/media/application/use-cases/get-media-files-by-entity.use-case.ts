import type { MediaFileResponseDto } from "@/modules/media/application/dtos/media.dto"
import { MediaFileMapper } from "@/modules/media/application/ports/media-file.mapper"
import type { EntityType } from "@/modules/media/domain/entities/MediaFile"
import { MediaDomainError } from "@/modules/media/domain/errors/media-domain.error"
import type { IMediaRepository } from "@/modules/media/domain/repositories/IMediaRepository"

export interface GetMediaFilesByEntityDto {
  entityType: EntityType
  entityId: string
}

export class GetMediaFilesByEntityUseCase {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async execute(
    dto: GetMediaFilesByEntityDto
  ): Promise<MediaFileResponseDto[]> {
    if (!dto.entityId?.trim()) {
      throw new MediaDomainError("entityId es requerido")
    }

    const files = await this.mediaRepository.findByEntity(
      dto.entityType,
      dto.entityId
    )

    return MediaFileMapper.toResponseDtoList(files)
  }
}
