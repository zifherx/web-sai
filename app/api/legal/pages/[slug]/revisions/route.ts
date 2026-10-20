import { type SlugContext } from "@/modules/legal/helpers/legal.helper"
import { listLegalPageRevisionsHandler } from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const GET = (req: NextRequest, ctx: SlugContext) =>
  listLegalPageRevisionsHandler(req, ctx)
