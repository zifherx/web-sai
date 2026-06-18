import {
  createCitaHandler,
  getAllCitasHandler,
} from "@/modules/cita/presentation/cita.controller"
import { NextRequest } from "next/server"

/**
 * GET  /api/cita  → lista todas (CMS)
 * POST /api/cita  → crea una nueva (público)
 */
export const GET = (req: NextRequest) => getAllCitasHandler(req)
export const POST = (req: NextRequest) => createCitaHandler(req)
