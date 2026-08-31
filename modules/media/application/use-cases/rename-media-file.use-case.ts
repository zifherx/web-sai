import {
  MediaFileResponseDto,
  RenameMediaFileDto,
} from "@/modules/media/application/dtos/media.dto"
import { MediaFileMapper } from "@/modules/media/application/ports/media-file.mapper"
import { MediaFileNotFoundError } from "@/modules/media/domain/errors/media-domain.error"
import { IMediaRepository } from "@/modules/media/domain/repositories/IMediaRepository"
import { IStorageService } from "@/modules/media/domain/repositories/IStorageService"

export class RenameMediaFileUseCase {
  constructor(
    private readonly mediaRepository: IMediaRepository,
    private readonly storageService: IStorageService
  ) {}

  async execute(dto: RenameMediaFileDto): Promise<MediaFileResponseDto> {
    const mediaFile = await this.mediaRepository.findById(dto.mediaFileId)
    if (!mediaFile) throw new MediaFileNotFoundError(dto.mediaFileId)

    await this.storageService.renameFile(mediaFile.fileKey, dto.fileName)

    const renamed = mediaFile.rename(dto.fileName)
    const saved = await this.mediaRepository.update(renamed)
    return MediaFileMapper.toResponseDto(saved)
  }
}
