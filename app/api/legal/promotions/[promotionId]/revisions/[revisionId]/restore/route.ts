import { type PromotionRevisionContext } from "@/modules/legal/helpers/legal.helper"
import { restoreLegalPromotionRevisionHandler } from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const POST = (req: NextRequest, ctx: PromotionRevisionContext) =>
  restoreLegalPromotionRevisionHandler(req, ctx)
