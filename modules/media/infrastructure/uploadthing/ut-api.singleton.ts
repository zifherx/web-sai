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
