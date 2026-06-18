import {
  deleteMarcaHandler,
  getMarcaByIdHandler,
  updateMarcaHandler,
} from "@/modules/marca/presentation/marca.controller"
import { type NextRequest } from "next/server"

type RouteContext = { params: Promise<{ id: string }> }

/**
 * GET    /api/marca/[id]  → detalle por ObjectId (CMS)
 * PATCH  /api/marca/[id]  → actualiza (solo CMS autenticado)
 * DELETE /api/marca/[id]  → elimina   (solo CMS autenticado)
 */
export const GET = (req: NextRequest, ctx: RouteContext) =>
  getMarcaByIdHandler(req, ctx)
export const PATCH = (req: NextRequest, ctx: RouteContext) =>
  updateMarcaHandler(req, ctx)
export const DELETE = (req: NextRequest, ctx: RouteContext) =>
  deleteMarcaHandler(req, ctx)
