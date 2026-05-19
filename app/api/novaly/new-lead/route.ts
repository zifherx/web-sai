import { NovalyController } from "@/modules/application"
import { NextRequest } from "next/server"

const controller = new NovalyController()
export const POST = (req: NextRequest) => controller.handlePost(req)
