import { getSystemEmailByIdHandler } from "@/modules/system-email/presentation/system-email.controller"
import { NextRequest } from "next/server"

/**
 * GET /api/system-emails/[id] - Lista un system-email (CMS).
 */

type RouteContext = { params: Promise<{ id: string }> }

export const GET = (req: NextRequest, ctx: RouteContext) =>
  getSystemEmailByIdHandler(req, ctx)
