import { MediaDeleteFailedError } from "@/modules/media/domain/errors/MediaDomainError"
import type { IStorageService } from "@/modules/media/domain/repositories/IStorageService"
import { getUTApi } from "@/modules/media/infrastructure/uploadthing/UTApiSingleton"

/**
 * Adaptador de salida para UploadThing.
 *
 * Implementa `IStorageService` usando UTApi — la interfaz server-side
 * de UploadThing. Es el único lugar de la arquitectura que conoce UTApi.
 *
 * Las subidas de archivos no pasan por aquí — las maneja el FileRouter
 * directamente desde el cliente. Este servicio solo gestiona operaciones
 * post-subida: delete, rename, getUrl.
 */

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
    // const result = await this.api.getFileUrls([fileKey])
    // const url = result.data?.[0]?.url
    // if (!url) {
    //   throw new MediaDeleteFailedError(fileKey, "No se pudo obtener la URL")
    // }
    // return url
    return `https://utfs.io/f/${fileKey}`
  }

  async renameFile(fileKey: string, newName: string): Promise<void> {
    try {
      await this.api.renameFiles([{ fileKey, newName }])
    } catch (err: any) {
      console.warn(
        `[UploadThingStorageService] renameFile warning:`,
        err.message
      )
    }
  }
}
