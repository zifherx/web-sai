import { type PromotionContext } from "@/modules/legal/helpers/legal.helper"
import { updateLegalPromotionSettingsHandler } from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const PATCH = (req: NextRequest, ctx: PromotionContext) =>
  updateLegalPromotionSettingsHandler(req, ctx)
