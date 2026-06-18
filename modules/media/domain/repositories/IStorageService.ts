export interface IStorageService {
  /**
   * Elimina un archivo del storage remoto por su fileKey.
   */
  deleteFile(fileKey: string): Promise<void>

  /**
   * Elimina múltiples archivos del storage remoto.
   */
  deleteFiles(fileKeys: string[]): Promise<void>

  /**
   * Obtiene la URL pública de un archivo por su fileKey.
   */
  getFileUrl(fileKey: string): Promise<string>

  /**
   * Renombra un archivo en el storage remoto.
   * Nota: en UploadThing esto es metadata, no altera la URL.
   */
  renameFile(fileKey: string, newName: string): Promise<void>
}
