import { enviarLeadNovalyHandler } from "@/modules/novaly/presentation/novaly.controller"
import type { NextRequest } from "next/server"

export const POST = (req: NextRequest) => enviarLeadNovalyHandler(req)
