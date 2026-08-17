import { seedHandler } from "@/modules/auth/presentation/auth.controller"
import { type NextRequest } from "next/server"

export const POST = (req: NextRequest) => seedHandler(req)
