import { type PromotionContext } from "@/modules/legal/helpers/legal.helper"
import { listLegalPromotionRevisionsHandler } from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const GET = (req: NextRequest, ctx: PromotionContext) =>
  listLegalPromotionRevisionsHandler(req, ctx)
