import {
  createCarroceriaHandler,
  getAllCarroceriasHandler,
} from "@/modules/carroceria/presentation/carroceria.controller"
import { type NextRequest } from "next/server"

export const GET = (req: NextRequest) => getAllCarroceriasHandler(req)
export const POST = (req: NextRequest) => createCarroceriaHandler(req)
