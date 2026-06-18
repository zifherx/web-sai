import {
  createMarcaHandler,
  getAllMarcasHandler,
} from "@/modules/marca/presentation/marca.controller"
import { NextRequest } from "next/server"

/**
 * GET  /api/marca  → lista todas (público + CMS)
 * POST /api/marca  → crea una nueva (solo CMS autenticado)
 */
export const GET = (req: NextRequest) => getAllMarcasHandler(req)
export const POST = (req: NextRequest) => createMarcaHandler(req)
