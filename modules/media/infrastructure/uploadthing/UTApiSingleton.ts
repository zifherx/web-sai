/**
 * Singleton de UTApi para operaciones server-side con UploadThing.
 *
 * UTApi es el cliente de UploadThing para el backend — permite eliminar,
 * renombrar y obtener URLs de archivos ya subidos. Se instancia una sola
 * vez y se reutiliza entre invocaciones del mismo runtime serverless,
 * evitando crear una nueva instancia HTTP por cada request.
 *
 * No usar para subidas — eso lo maneja el FileRouter de UploadThing
 * directamente desde el cliente (browser/app).
 */
import { UTApi } from "uploadthing/server"

let utApiInstance: UTApi | null = null

export function getUTApi(): UTApi {
  if (!utApiInstance) {
    if (!process.env.UPLOADTHING_SECRET) {
      throw new Error(`Variable de entorno requerida: UPLOADTHING_SECRET`)
    }
    utApiInstance = new UTApi()
  }
  return utApiInstance
}
