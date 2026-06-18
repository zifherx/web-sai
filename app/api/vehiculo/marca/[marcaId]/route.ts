import { getVehiculosByMarcaHandler } from "@/modules/vehiculo/presentation/vehiculo.controller"
import { NextRequest } from "next/server"

type RouteContext = { params: Promise<{ marcaId: string }> }

/**
 * GET /api/vehiculo/marca/[marca] -> vehiculos disponibles para una marca (frontend: catálogo por marca)
 */

export const GET = (req: NextRequest, ctx: RouteContext) =>
  getVehiculosByMarcaHandler(req, ctx)
