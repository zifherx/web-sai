import { getActiveVehiculosHandler } from "@/modules/vehiculo/presentation/vehiculo.controller"
import { NextRequest } from "next/server"

/**
 * GET /api/vehiculo/active → solo marcas activas (filtros sin isActive)
 */
export const GET = (req: NextRequest) => getActiveVehiculosHandler(req)
