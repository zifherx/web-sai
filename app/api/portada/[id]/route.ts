import {
  deletePortadaHandler,
  getPortadaByIdHandler,
  updatePortadaHandler,
} from "@/modules/portada/presentation/portada.controller"
import { NextRequest } from "next/server"

type RouteContext = { params: Promise<{ id: string }> }

/**
 * GET    /api/portada/[id]  → detalle por ObjectId (CMS)
 * PATCH  /api/portada/[id]  → actualiza (solo CMS autenticado)
 * DELETE /api/portada/[id]  → elimina   (solo CMS autenticado)
 */
export const GET = (req: NextRequest, ctx: RouteContext) =>
  getPortadaByIdHandler(req, ctx)
export const PATCH = (req: NextRequest, ctx: RouteContext) =>
  updatePortadaHandler(req, ctx)
export const DELETE = (req: NextRequest, ctx: RouteContext) =>
  deletePortadaHandler(req, ctx)
