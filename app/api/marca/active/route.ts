import { getActiveMarcasHandler } from "@/modules/marca/presentation/marca.controller"
import { NextRequest } from "next/server"

/**
 * GET /api/marca/active → solo marcas activas (público + CMS)
 */
export const GET = (req: NextRequest) => getActiveMarcasHandler(req)
