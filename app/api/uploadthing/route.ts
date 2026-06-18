import { mediaFileRouter } from "@/modules/media/infrastructure/uploadthing/mediaFileRouter"
import { createRouteHandler } from "uploadthing/next"

export const { GET, POST } = createRouteHandler({ router: mediaFileRouter })
