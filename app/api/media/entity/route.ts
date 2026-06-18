import { getMediaByEntityHandler } from "@/modules/media/presentation/media.controller"
import { NextRequest } from "next/server"

/**
 * GET /api/media/entity
 * Archivos asociados a una entidad concreta (solo CMS autenticado).
 * Query: ?entityType=vehiculo&entityId=<ObjectId>
 */
export const GET = (req: NextRequest) => getMediaByEntityHandler(req)
