import {
  createLegalPromotionHandler,
  listLegalPromotionsHandler,
} from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const GET = (req: NextRequest) => listLegalPromotionsHandler(req)
export const POST = (req: NextRequest) => createLegalPromotionHandler(req)
