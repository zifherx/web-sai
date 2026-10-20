import { type SlugContext } from "@/modules/legal/helpers/legal.helper"
import { saveLegalPageDraftHandler } from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const PUT = (req: NextRequest, ctx: SlugContext) =>
  saveLegalPageDraftHandler(req, ctx)
