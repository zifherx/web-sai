import type { DeleteManyMediaFilesDto } from "@/modules/media/application/dtos/media.dto"
import { MediaFileNotFoundError } from "@/modules/media/domain/errors/media-domain.error"
import type { IMediaRepository } from "@/modules/media/domain/repositories/IMediaRepository"
import type { IStorageService } from "@/modules/media/domain/repositories/IStorageService"

export class DeleteManyMediaFilesUseCase {
  constructor(
    private readonly mediaRepository: IMediaRepository,
    private readonly storageService: IStorageService
  ) {}

  async execute(dto: DeleteManyMediaFilesDto): Promise<void> {
    // Verificar existencia de todos antes de eliminar
    const mediaFiles = await Promise.all(
      dto.mediaFileIds.map(async (id) => {
        const file = await this.mediaRepository.findById(id)
        if (!file) throw new MediaFileNotFoundError(id)
        return file
      })
    )

    const fileKeys = mediaFiles.map((f) => f.fileKey)

    // Una sola llamada batch a UploadThing
    await this.storageService.deleteFiles(fileKeys)

    // Una sola llamada batch a MongoDB
    await this.mediaRepository.deleteMany(mediaFiles.map((f) => f.id))
  }
}
