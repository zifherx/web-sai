import { NextRequest } from "next/server"
import { listMediaFilesHandler } from "@/modules/media/presentation/media.controller"

/**
 * GET /api/media
 * Lista archivos con filtros opcionales y paginación (solo CMS autenticado).
 * Query: ?entityType=marca&entityId=...&search=...&limit=50&offset=0
 */
export const GET = (req: NextRequest) => listMediaFilesHandler(req)
