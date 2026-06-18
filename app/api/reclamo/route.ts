import {
  createReclamoHandler,
  getAllReclamosHandler,
} from "@/modules/reclamo/presentation/reclamo.controller"
import { NextRequest } from "next/server"

/**
 * GET  /api/reclamo  → obtener reclamo por id (CMS)
 * POST /api/reclamo  → crea una nueva (público)
 */
export const GET = (req: NextRequest) => getAllReclamosHandler(req)
export const POST = (req: NextRequest) => createReclamoHandler(req)
