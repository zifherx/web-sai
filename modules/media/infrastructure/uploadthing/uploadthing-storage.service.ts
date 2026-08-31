import { MediaDeleteFailedError } from "@/modules/media/domain/errors/media-domain.error"
import type { IStorageService } from "@/modules/media/domain/repositories/IStorageService"
import { getUTApi } from "@/modules/media/infrastructure/uploadthing/ut-api.singleton"

export class UploadThingStorageService implements IStorageService {
  private get api() {
    return getUTApi()
  }

  async deleteFile(fileKey: string): Promise<void> {
    try {
      await this.api.deleteFiles([fileKey])
    } catch (error) {
      throw new MediaDeleteFailedError(
        fileKey,
        error instanceof Error ? error.message : String(error)
      )
    }
  }

  async deleteFiles(fileKeys: string[]): Promise<void> {
    if (fileKeys.length === 0) return
    try {
      await this.api.deleteFiles(fileKeys)
    } catch (error) {
      throw new MediaDeleteFailedError(
        fileKeys.join(", "),
        error instanceof Error ? error.message : String(error)
      )
    }
  }

  async getFileUrl(fileKey: string): Promise<string> {
    const result = await this.api.getFileUrls([fileKey])
    const url = result.data?.[0]?.url
    if (!url) {
      throw new MediaDeleteFailedError(fileKey, "No se pudo obtener la URL")
    }
    return url
  }

  async renameFile(fileKey: string, newName: string): Promise<void> {
    await this.api.renameFiles([{ fileKey, newName }])
  }
}
