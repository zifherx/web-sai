import { getLeadCorporativoByIdHandler } from "@/modules/lead-corporativo/presentation/lead-corporativo.controller"
import { NextRequest } from "next/server"

type RouteContext = { params: Promise<{ id: string }> }

/**
 * GET /api/lead-corporativo/[id] -> detalle por ObjectId (CMS)
 */

export const GET = (req: NextRequest, ctx: RouteContext) =>
  getLeadCorporativoByIdHandler(req, ctx)
