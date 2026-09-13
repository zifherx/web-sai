import { auth } from "@/modules/auth/infrastructure/config/better-auth.config"
import { RegisterUploadedFileUseCase } from "@/modules/media/application/use-cases"
import { MongooseMediaRepository } from "@/modules/media/infrastructure/mongoose/mongoose-media.repository"
import { connectDB } from "@/shared/infrastructure/connection"
import { createUploadthing, type FileRouter } from "uploadthing/next"

export interface IUserMetadata {
  uploadedBy: string
}

export interface IFile {
  key: string
  ufsUrl: string
  name: string
  size: number
  type: string
}

const f = createUploadthing()

async function requireAuthenticatedUser(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) throw new Error("No autorizado")
  return { uploadedBy: session.user.id }
}

async function persistUpload(metadata: IUserMetadata, file: IFile) {
  await connectDB()
  const repository = new MongooseMediaRepository()
  const useCase = new RegisterUploadedFileUseCase(repository)

  const saved = await useCase.execute({
    fileKey: file.key,
    fileUrl: file.ufsUrl,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    uploadedBy: metadata.uploadedBy,
  })

  return { fileKey: file.key, fileUrl: file.ufsUrl, mediaFileId: saved.id }
}

export const mediaFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(({ req }) => requireAuthenticatedUser(req))
    .onUploadComplete(async ({ metadata, file }) =>
      persistUpload(metadata, file)
    ),
  vehicleGallery: f({ image: { maxFileSize: "8MB", maxFileCount: 20 } })
    .middleware(({ req }) => requireAuthenticatedUser(req))
    .onUploadComplete(async ({ metadata, file }) =>
      persistUpload(metadata, file)
    ),
  colorSwatch: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(({ req }) => requireAuthenticatedUser(req))
    .onUploadComplete(async ({ metadata, file }) =>
      persistUpload(metadata, file)
    ),
} satisfies FileRouter

export type MediaFileRouter = typeof mediaFileRouter
