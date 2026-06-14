import {
  createCotizacionHandler,
  getAllCotizacionesHandler,
} from "@/modules/cotizacion/presentation/cotizacion.controller"
import { NextRequest } from "next/server"

/**
 * GET  /api/cotizacion  → lista todas (CMS)
 * POST /api/cotizacion  → crea una nueva (público)
 */
export const GET = (req: NextRequest) => getAllCotizacionesHandler(req)
export const POST = (req: NextRequest) => createCotizacionHandler(req)
