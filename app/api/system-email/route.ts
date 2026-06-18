import {
  createSystemEmailHandler,
  getAllSystemEmailsHandler,
} from "@/modules/system-email/presentation/system-email.controller"
import { NextRequest } from "next/server"

/**
 * GET /api/system-emails - Lista todos (CMS).
 * POST /api/system-emails - Crear nuevo system-email (CMS)
 */

export const GET = (req: NextRequest) => getAllSystemEmailsHandler(req)
export const POST = (req: NextRequest) => createSystemEmailHandler(req)
