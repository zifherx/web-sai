import { renameMediaFileHandler } from "@/modules/media/presentation/media.controller"
import { NextRequest } from "next/server"

type RouteContext = { params: Promise<{ id: string }> }

/**
 * PATCH /api/media/[id]/rename
 * Actualiza el nombre de un archivo del CDN y de MongoDB (solo CMS autenticado).
 */
export const PATCH = (req: NextRequest, ctx: RouteContext) =>
  renameMediaFileHandler(req, ctx)
