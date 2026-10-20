import { assignManyMediaFilesHandler } from "@/modules/media/presentation/media.controller"
import { type NextRequest } from "next/server"

/**
 * POST /api/media/bulk/assign
 * Asignación masiva a una entidad — útil para galería de vehículo (solo CMS autenticado).
 */
export const POST = (req: NextRequest) => assignManyMediaFilesHandler(req)
