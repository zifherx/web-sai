import type {
  AssignMediaFileDto,
  MediaFileResponseDto,
} from "@/modules/media/application/dtos/media.dto"
import { MediaFileMapper } from "@/modules/media/application/ports/MediaFileMapper"
import { MediaFileNotFoundError } from "@/modules/media/domain/errors/MediaDomainError"
import type { IMediaRepository } from "@/modules/media/domain/repositories/IMediaRepository"
import { EntityAssignment } from "@/modules/media/domain/value-objects/EntityAssignment"

export class AssignMediaFileUseCase {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async execute(dto: AssignMediaFileDto): Promise<MediaFileResponseDto> {
    const mediaFile = await this.mediaRepository.findById(dto.mediaFileId)
    if (!mediaFile) {
      throw new MediaFileNotFoundError(dto.mediaFileId)
    }

    // EntityAssignment valida las reglas de negocio y resuelve fieldName
    const assignment = EntityAssignment.create(dto.entityType, dto.entityId)

    const updated = mediaFile.assign(
      assignment.entityType,
      assignment.entityId,
      assignment.fieldName
    )

    const saved = await this.mediaRepository.update(updated)
    return MediaFileMapper.toResponseDto(saved)
  }
}
