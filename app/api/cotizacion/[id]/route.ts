import { getCotizacionByIdHandler } from "@/modules/cotizacion/presentation/cotizacion.controller"
import { type NextRequest } from "next/server"

type RouteContext = { params: Promise<{ id: string }> }

/**
 * GET  /api/cotizacion/[id]  → lista cita por Id (CMS)
 */
export const GET = (req: NextRequest, ctx: RouteContext) =>
  getCotizacionByIdHandler(req, ctx)
