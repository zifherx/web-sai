import { deleteManyMediaFilesHandler } from "@/modules/media/presentation/media.controller"
import { NextRequest } from "next/server"

/**
 * DELETE /api/media/bulk/delete
 * Eliminación batch — una sola llamada a UploadThing (solo CMS autenticado).
 */
export const DELETE = (req: NextRequest) => deleteManyMediaFilesHandler(req)
