import { seedLegalContentHandler } from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const POST = (req: NextRequest) => seedLegalContentHandler(req)
