import { type PromotionContext } from "@/modules/legal/helpers/legal.helper"
import { publishLegalPromotionHandler } from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const POST = (req: NextRequest, ctx: PromotionContext) =>
  publishLegalPromotionHandler(req, ctx)
