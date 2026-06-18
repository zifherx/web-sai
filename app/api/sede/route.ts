import {
  createSedeHandler,
  getAllSedesHandler,
} from "@/modules/sede/presentation/sede.controller"
import { NextRequest } from "next/server"

/**
 * GET  /api/sede  → lista todas (público + CMS)
 * POST /api/sede  → crea una nueva (solo CMS autenticado)
 */
export const GET = (req: NextRequest) => getAllSedesHandler(req)
export const POST = (req: NextRequest) => createSedeHandler(req)
