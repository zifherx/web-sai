import { getActivePortadasHandler } from "@/modules/portada/presentation/portada.controller"
import { type NextRequest } from "next/server"

/**
 * GET /api/portada/active → solo marcas activas (público + CMS)
 */
export const GET = (req: NextRequest) => getActivePortadasHandler(req)
