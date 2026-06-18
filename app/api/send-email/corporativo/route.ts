import { sendLeadCorporativoEmailHandler } from "@/modules/email/presentation/email.controller"
import type { NextRequest } from "next/server"

/**
 * POST /api/email/lead-corporativo → notificación al área Corporativo (público)
 */

export const POST = (req: NextRequest) => sendLeadCorporativoEmailHandler(req)
