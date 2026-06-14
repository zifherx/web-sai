import type {
  MediaFileResponseDto,
  RegisterUploadedFileDto,
} from "@/modules/media/application/dtos/media.dto"
import { MediaFileMapper } from "@/modules/media/application/ports/MediaFileMapper"
import { MediaFile } from "@/modules/media/domain/entities/MediaFile"
import type { IMediaRepository } from "@/modules/media/domain/repositories/IMediaRepository"

export class RegisterUploadedFileUseCase {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async execute(dto: RegisterUploadedFileDto): Promise<MediaFileResponseDto> {
    const now = new Date()

    const mediaFile = new MediaFile({
      id: "", // La infra asigna el _id de Mongo
      fileKey: dto.fileKey,
      fileUrl: dto.fileUrl,
      fileName: dto.fileName,
      fileSize: dto.fileSize,
      fileType: dto.fileType,
      entityType: "unassigned",
      entityId: "",
      fieldName: "",
      uploadedBy: dto.uploadedBy,
      createdAt: now,
      updatedAt: now,
    })

    const saved = await this.mediaRepository.save(mediaFile)
    return MediaFileMapper.toResponseDto(saved)
  }
}
