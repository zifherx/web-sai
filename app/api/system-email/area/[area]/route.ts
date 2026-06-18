import { getSystemEmailByAreaHandler } from "@/modules/system-email/presentation/system-email.controller"
import { NextRequest } from "next/server"

/**
 * GET /api/system-emails/area/[area] - Lista todos los system-email de un area (CMS).
 */

type RouteContext = { params: Promise<{ area: string }> }

export const GET = (req: NextRequest, ctx: RouteContext) =>
  getSystemEmailByAreaHandler(req, ctx)
