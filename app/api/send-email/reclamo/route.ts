import { sendReclamoEmailHandler } from "@/modules/email/presentation/email.controller"
import { NextRequest } from "next/server"

/**
 * POST /api/email/reclamo → reclamo con PDF al área Reclamos (público)
 */
export const POST = (req: NextRequest) => sendReclamoEmailHandler(req)
