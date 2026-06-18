import {
  deleteSedeHandler,
  getSedeByIdHandler,
  updateSedeHandler,
} from "@/modules/sede/presentation/sede.controller"
import { NextRequest } from "next/server"

type RouteContext = { params: Promise<{ id: string }> }

/**
 * GET /api/sede/[id] -> detalle por ObjectId (CMS)
 * PATCH /api/sede/[id] -> actualzia (solo CMS autenticado)
 * DELETE /api/sede/[id] -> elimina (solo CMS autenticado)
 */

export const GET = (req: NextRequest, ctx: RouteContext) =>
  getSedeByIdHandler(req, ctx)
export const PATCH = (req: NextRequest, ctx: RouteContext) =>
  updateSedeHandler(req, ctx)
export const DELETE = (req: NextRequest, ctx: RouteContext) =>
  deleteSedeHandler(req, ctx)
