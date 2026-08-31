import { OurFileRouter } from "@/modules/media/infrastructure/uploadthing/core"
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react"

export const UploadButton = generateUploadButton<OurFileRouter>()
export const UploadDropzone = generateUploadDropzone<OurFileRouter>()
