import type {
  ListMediaFilesDto,
  PaginatedMediaResponseDto,
} from "@/modules/media/application/dtos/media.dto"
import { MediaFileMapper } from "@/modules/media/application/ports/media-file.mapper"
import type { IMediaRepository } from "@/modules/media/domain/repositories/IMediaRepository"

const DEFAULT_LIMIT = 50
const MAX_LIMIT = 200

export class ListMediaFilesUseCase {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async execute(
    dto: ListMediaFilesDto = {}
  ): Promise<PaginatedMediaResponseDto> {
    const limit = Math.min(dto.limit ?? DEFAULT_LIMIT, MAX_LIMIT)
    const offset = dto.offset ?? 0

    const filters = {
      entityType: dto.entityType,
      entityId: dto.entityId,
      search: dto.search,
      limit,
      offset,
    }

    const [files, total] = await Promise.all([
      this.mediaRepository.findMany(filters),
      this.mediaRepository.count(filters),
    ])

    return {
      data: MediaFileMapper.toResponseDtoList(files),
      total,
      limit,
      offset,
    }
  }
}
