import { deleteMediaFileHandler } from "@/modules/media/presentation/media.controller"
import { NextRequest } from "next/server"

type RouteContext = { params: Promise<{ id: string }> }

/**
 * DELETE /api/media/[id]
 * Elimina un archivo del CDN y de MongoDB (solo CMS autenticado).
 */
export const DELETE = (req: NextRequest, ctx: RouteContext) =>
  deleteMediaFileHandler(req, ctx)
