import { type PromotionContext } from "@/modules/legal/helpers/legal.helper"
import {
  deleteLegalPromotionHandler,
  getLegalPromotionHandler,
} from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const GET = (req: NextRequest, ctx: PromotionContext) =>
  getLegalPromotionHandler(req, ctx)
export const DELETE = (req: NextRequest, ctx: PromotionContext) =>
  deleteLegalPromotionHandler(req, ctx)
