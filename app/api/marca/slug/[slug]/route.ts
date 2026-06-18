import { getMarcaBySlugHandler } from "@/modules/marca/presentation/marca.controller"
import type { NextRequest } from "next/server"

type RouteContext = { params: Promise<{ slug: string }> }

/**
 * GET /api/marca/slug/[slug] → detalle por slug (público + CMS)
 */
export const GET = (req: NextRequest, ctx: RouteContext) =>
  getMarcaBySlugHandler(req, ctx)
