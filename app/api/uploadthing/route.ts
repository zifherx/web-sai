import { mediaFileRouter } from "@/modules/media/infrastructure/uploadthing/media-file.router"
import { createRouteHandler } from "uploadthing/next"

export const { GET, POST } = createRouteHandler({ router: mediaFileRouter })
