import { getTalleresHandler } from "@/modules/sede/presentation/sede.controller"
import { NextRequest } from "next/server"

/**
 * GET /api/sedes/talleres -> sedes que operan como taller (público + CMS)
 */

export const GET = (req: NextRequest) => getTalleresHandler(req)
