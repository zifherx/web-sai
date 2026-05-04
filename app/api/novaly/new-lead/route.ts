import { NovalyController } from "@/interfaces/application/novaly/novaly.controller"
import { NextRequest } from "next/server"

const controller = new NovalyController()
export const POST = (req: NextRequest) => controller.handlePost(req)
