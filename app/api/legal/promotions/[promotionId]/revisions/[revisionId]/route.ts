import { type PromotionRevisionContext } from "@/modules/legal/helpers/legal.helper"
import { getLegalPromotionRevisionHandler } from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const GET = (req: NextRequest, ctx: PromotionRevisionContext) =>
  getLegalPromotionRevisionHandler(req, ctx)
