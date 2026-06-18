import {
  createVehiculoHandler,
  getAllVehiculosHandler,
} from "@/modules/vehiculo/presentation/vehiculo.controller"
import { NextRequest } from "next/server"

/**
 * GET  /api/vehiculo  → lista todas (filtros)
 * POST /api/vehiculo  → crea una nueva
 */
export const GET = (req: NextRequest) => getAllVehiculosHandler(req)
export const POST = (req: NextRequest) => createVehiculoHandler(req)
