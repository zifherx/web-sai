import type {
  AssignManyMediaFilesDto,
  MediaFileResponseDto,
} from "@/modules/media/application/dtos/media.dto"
import { MediaFileMapper } from "@/modules/media/application/ports/MediaFileMapper"
import { MediaFileNotFoundError } from "@/modules/media/domain/errors/MediaDomainError"
import type { IMediaRepository } from "@/modules/media/domain/repositories/IMediaRepository"
import { EntityAssignment } from "@/modules/media/domain/value-objects/EntityAssignment"

export class AssignManyMediaFilesUseCase {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async execute(dto: AssignManyMediaFilesDto): Promise<MediaFileResponseDto[]> {
    const assignment = EntityAssignment.create(dto.entityType, dto.entityId)

    const updatePromises = dto.mediaFileIds.map(async (id) => {
      const mediaFile = await this.mediaRepository.findById(id)
      if (!mediaFile) throw new MediaFileNotFoundError(id)

      const updated = mediaFile.assign(
        assignment.entityType,
        assignment.entityId,
        assignment.fieldName
      )
      return this.mediaRepository.update(updated)
    })

    const results = await Promise.all(updatePromises)
    return MediaFileMapper.toResponseDtoList(results)
  }
}
