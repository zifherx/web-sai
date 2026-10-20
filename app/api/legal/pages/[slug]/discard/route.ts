import { type SlugContext } from "@/modules/legal/helpers/legal.helper"
import { discardLegalPageDraftHandler } from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const POST = (req: NextRequest, ctx: SlugContext) =>
  discardLegalPageDraftHandler(req, ctx)
