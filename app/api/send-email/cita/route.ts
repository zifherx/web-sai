import { sendCitaEmailHandler } from "@/modules/email/presentation/email.controller"
import type { NextRequest } from "next/server"

/**
 * POST /api/email/cita → confirmación de cita al cliente y área (público)
 */

export const POST = (req: NextRequest) => sendCitaEmailHandler(req)
