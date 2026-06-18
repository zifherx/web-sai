import { getCitaByIdHandler } from "@/modules/cita/presentation/cita.controller"
import { NextRequest } from "next/server"

type RouteContext = { params: Promise<{ id: string }> }

/**
 * GET  /api/sede/[id]  → lista cita por Id (CMS)
 */
export const GET = (req: NextRequest, ctx: RouteContext) =>
  getCitaByIdHandler(req, ctx)
