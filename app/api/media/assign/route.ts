import { assignMediaFileHandler } from "@/modules/media/presentation/media.controller"
import { NextRequest } from "next/server"

/**
 * POST /api/media/assign
 * Asigna un MediaFile a una entidad del CMS (solo CMS autenticado).
 */
export const POST = (req: NextRequest) => assignMediaFileHandler(req)
