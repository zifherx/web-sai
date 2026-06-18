import {
  createPortadaHandler,
  getAllPortadasHandler,
} from "@/modules/portada/presentation/portada.controller"
import { NextRequest } from "next/server"

/**
 * GET  /api/portada  → lista todas (público + CMS)
 * POST /api/portada  → crea una nueva (solo CMS autenticado)
 */
export const GET = (req: NextRequest) => getAllPortadasHandler(req)
export const POST = (req: NextRequest) => createPortadaHandler(req)
