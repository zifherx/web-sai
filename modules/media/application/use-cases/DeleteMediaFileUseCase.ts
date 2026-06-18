import type { DeleteMediaFileDto } from "@/modules/media/application/dtos/media.dto"
import { MediaFileNotFoundError } from "@/modules/media/domain/errors/MediaDomainError"
import type { IMediaRepository } from "@/modules/media/domain/repositories/IMediaRepository"
import type { IStorageService } from "@/modules/media/domain/repositories/IStorageService"

export class DeleteMediaFileUseCase {
  constructor(
    private readonly mediaRepository: IMediaRepository,
    private readonly storageService: IStorageService
  ) {}

  async execute(dto: DeleteMediaFileDto): Promise<void> {
    const mediaFile = await this.mediaRepository.findById(dto.mediaFileId)
    if (!mediaFile) {
      throw new MediaFileNotFoundError(dto.mediaFileId)
    }

    // Primero eliminar del CDN, luego de la DB
    await this.storageService.deleteFile(mediaFile.fileKey)
    await this.mediaRepository.delete(mediaFile.id)
  }
}
