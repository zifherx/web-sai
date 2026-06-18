import { getVehiculoBySlugHandler } from "@/modules/vehiculo/presentation/vehiculo.controller"
import { NextRequest } from "next/server"

type RouteContext = { params: Promise<{ slug: string }> }

/**
 * GET /api/vehiculo/slug/[slug] -> detalle de vehiculo por slug (frontend: detalle de vehículo)
 */

export const GET = (req: NextRequest, ctx: RouteContext) =>
  getVehiculoBySlugHandler(req, ctx)
