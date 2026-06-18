import {
  deleteVehiculoHandler,
  getVehiculoByIdHandler,
  updateVehiculoHandler,
} from "@/modules/vehiculo/presentation/vehiculo.controller"
import { NextRequest } from "next/server"

type RouteContext = { params: Promise<{ id: string }> }

/**
 * GET /api/vehiculo/[id] -> detalle por ObjectId (CMS)
 * PATCH /api/vehiculo/[id] -> actualzia (solo CMS autenticado)
 * DELETE /api/vehiculo/[id] -> elimina (solo CMS autenticado)
 */

export const GET = (req: NextRequest, ctx: RouteContext) =>
  getVehiculoByIdHandler(req, ctx)
export const PATCH = (req: NextRequest, ctx: RouteContext) =>
  updateVehiculoHandler(req, ctx)
export const DELETE = (req: NextRequest, ctx: RouteContext) =>
  deleteVehiculoHandler(req, ctx)
