import { MongooseMediaRepository } from "@/modules/media/infrastructure/mongoose/MongooseMediaRepository"
import { connectDB } from "@/shared/infrastructure/connection"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { RegisterUploadedFileUseCase } from "../../application/use-cases"

const f = createUploadthing()

/**
 * FileRouter de UploadThing para el módulo Media.
 *
 * Define las rutas de upload disponibles. Cada ruta especifica:
 * - Tipos y tamaño máximo de archivo permitidos
 * - Validación de autenticación (middleware)
 * - Callback `onUploadComplete` que persiste el MediaFile en MongoDB
 *
 * El flujo es:
 *   1. Cliente solicita una URL de subida a esta ruta
 *   2. UploadThing sube el archivo directo al CDN (sin pasar por el backend)
 *   3. UploadThing llama a `onUploadComplete` con los metadatos del archivo
 *   4. `RegisterUploadedFileUseCase` persiste el registro en MongoDB
 *
 * Rutas disponibles:
 * - `imageUploader`: imágenes de entidades (marca, portada, sede, vehiculo)
 * - `vehicleGallery`: galería de imágenes de un vehículo (hasta 20 archivos)
 * - `colorSwatch`: imágenes de color de vehículo (carColor)
 */

export const mediaFileRouter = {
  /**
   * Ruta para imágenes únicas:
   * MarcaDocument.imageUrl, PortadaDocument.imageUrl, SedeDocument.imageUrl,
   * VehiculoDocument.imageUrl
   */
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const userId = req.headers.get("x-clerk-user-id")
      if (!userId) throw new Error("No autorizado")
      return { uploadedBy: userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await connectDB()
      const repository = new MongooseMediaRepository()
      const useCase = new RegisterUploadedFileUseCase(repository)
      await useCase.execute({
        fileKey: file.key,
        fileUrl: file.ufsUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadedBy: metadata.uploadedBy,
      })
      return { filekey: file.key, fileurl: file.ufsUrl }
    }),

  /**
   * Ruta para galería de vehículos:
   * VehiculoDocument.galeria[].imageUrl (hasta 20 imágenes)
   */
  vehicleGallery: f({ image: { maxFileSize: "8MB", maxFileCount: 20 } })
    .middleware(async ({ req }) => {
      const userId = req.headers.get("x-clerk-user-id")
      if (!userId) throw new Error("No autorizado")
      return { uploadedBy: userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await connectDB()
      const repository = new MongooseMediaRepository()
      const useCase = new RegisterUploadedFileUseCase(repository)

      await useCase.execute({
        fileKey: file.key,
        fileUrl: file.ufsUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadedBy: metadata.uploadedBy,
      })
      return { fileKey: file.key, fileUrl: file.ufsUrl }
    }),

  /**
   * Ruta para imagen de color de vehículo:
   * VehiculoDocument.colores[].carColor
   */
  colorSwatch: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const userId = req.headers.get("x-clerk-user-id")
      if (!userId) throw new Error("No autorizado")
      return { uploadedBy: userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await connectDB()
      const repository = new MongooseMediaRepository()
      const useCase = new RegisterUploadedFileUseCase(repository)

      await useCase.execute({
        fileKey: file.key,
        fileUrl: file.ufsUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadedBy: metadata.uploadedBy,
      })
      return { fileKey: file.key, fileUrl: file.ufsUrl }
    }),
} satisfies FileRouter

export type MediaFileRouter = typeof mediaFileRouter
