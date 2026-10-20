import { type PromotionContext } from "@/modules/legal/helpers/legal.helper"
import { saveLegalPromotionDraftHandler } from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const PUT = (req: NextRequest, ctx: PromotionContext) =>
  saveLegalPromotionDraftHandler(req, ctx)
