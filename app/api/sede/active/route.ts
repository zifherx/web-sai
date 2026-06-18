import { getActiveSedesHandler } from "@/modules/sede/presentation/sede.controller"
import { NextRequest } from "next/server"

/**
 * GET /api/sede/active → solo marcas activas (público + CMS)
 */
export const GET = (req: NextRequest) => getActiveSedesHandler(req)
