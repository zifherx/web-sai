import {
  AssignManyMediaFilesUseCase,
  AssignMediaFileUseCase,
  DeleteManyMediaFilesUseCase,
  DeleteMediaFileUseCase,
  GetMediaFilesByEntityUseCase,
  ListMediaFilesUseCase,
  RegisterUploadedFileUseCase,
} from "@/modules/media/application/use-cases"
import { MongooseMediaRepository } from "@/modules/media/infrastructure/mongoose/mongoose-media.repository"
import { UploadThingStorageService } from "@/modules/media/infrastructure/uploadthing/uploadthing-storage.service"
import { RenameMediaFileUseCase } from "../application/use-cases/rename-media-file.use-case"

export function mediaFactory() {
  const repository = new MongooseMediaRepository()
  const storageService = new UploadThingStorageService()

  return {
    list: new ListMediaFilesUseCase(repository),
    getByEntity: new GetMediaFilesByEntityUseCase(repository),
    assign: new AssignMediaFileUseCase(repository),
    assignMany: new AssignManyMediaFilesUseCase(repository),
    delete: new DeleteMediaFileUseCase(repository, storageService),
    deleteMany: new DeleteManyMediaFilesUseCase(repository, storageService),
    create: new RegisterUploadedFileUseCase(repository),
    rename: new RenameMediaFileUseCase(repository, storageService),
  }
}
