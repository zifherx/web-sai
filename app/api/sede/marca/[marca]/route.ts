import { getSedesByMarcaHandler } from "@/modules/sede/presentation/sede.controller"
import { NextRequest } from "next/server"

type RouteContext = { params: Promise<{ marca: string }> }

/**
 * GET /api/sede/marca/[marca] -> sedes de ventas disponibles para una marca (público)
 */

export const GET = (req: NextRequest, ctx: RouteContext) =>
  getSedesByMarcaHandler(req, ctx)
