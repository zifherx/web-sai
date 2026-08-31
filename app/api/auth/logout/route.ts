import { logoutHandler } from "@/modules/auth/presentation/auth.controller"
import { type NextRequest } from "next/server"

export const POST = (req: NextRequest) => logoutHandler(req)
