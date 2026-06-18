import { getReclamoByIdHandler } from "@/modules/reclamo/presentation/reclamo.controller"
import { NextRequest } from "next/server"

type RouteContext = { params: Promise<{ id: string }> }
/**
 * GET  /api/reclamo/[id]  → detalle por ObjectId (CMS)
 */
export const GET = (req: NextRequest, ctx: RouteContext) =>
  getReclamoByIdHandler(req, ctx)
