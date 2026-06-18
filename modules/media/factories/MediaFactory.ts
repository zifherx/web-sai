import {
  AssignManyMediaFilesUseCase,
  AssignMediaFileUseCase,
  DeleteManyMediaFilesUseCase,
  DeleteMediaFileUseCase,
  GetMediaFilesByEntityUseCase,
  ListMediaFilesUseCase,
  RegisterUploadedFileUseCase,
} from "@/modules/media/application/use-cases"
import { MongooseMediaRepository } from "@/modules/media/infrastructure/mongoose/MongooseMediaRepository"
import { UploadThingStorageService } from "@/modules/media/infrastructure/uploadthing/StorageService"

/**
 * Composition root del módulo Media.
 *
 * El repositorio y el storage service se instancian una vez
 * y se comparten entre todos los use-cases del request.
 *
 * Nota: `RegisterUploadedFileUseCase` no está aquí — se instancia
 * directamente en el FileRouter de UploadThing (`mediaFileRouter.ts`)
 * porque vive en el callback `onUploadComplete`, fuera del flujo HTTP normal.
 */

export function mediaFactory() {
  const mediaRepository = new MongooseMediaRepository()
  const storageService = new UploadThingStorageService()

  return {
    create: new RegisterUploadedFileUseCase(mediaRepository),
    list: new ListMediaFilesUseCase(mediaRepository),
    getByEntity: new GetMediaFilesByEntityUseCase(mediaRepository),
    assign: new AssignMediaFileUseCase(mediaRepository),
    assignMany: new AssignManyMediaFilesUseCase(mediaRepository),
    delete: new DeleteMediaFileUseCase(mediaRepository, storageService),
    deleteMany: new DeleteManyMediaFilesUseCase(
      mediaRepository,
      storageService
    ),
  }
}
