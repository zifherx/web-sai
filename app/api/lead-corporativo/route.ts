import {
  createLeadCorporativoHandler,
  getAllLeadsCorporativosHandler,
} from "@/modules/lead-corporativo/presentation/lead-corporativo.controller"
import { NextRequest } from "next/server"

/**
 * GET  /api/lead-corporativo  → lista todas (CMS)
 * POST /api/lead-corporativo  → crea una nueva (público)
 */
export const GET = (req: NextRequest) => getAllLeadsCorporativosHandler(req)
export const POST = (req: NextRequest) => createLeadCorporativoHandler(req)
