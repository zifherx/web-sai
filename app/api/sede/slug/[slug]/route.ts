import { getSedeBySlugHandler } from "@/modules/sede/presentation/sede.controller"
import { NextRequest } from "next/server"

type RouteContext = { params: Promise<{ slug: string }> }

/**
 * GET /api/sede/slug/[slug] -> detalle de sede por slug (público + CMS)
 */

export const GET = (req: NextRequest, ctx: RouteContext) =>
  getSedeBySlugHandler(req, ctx)
