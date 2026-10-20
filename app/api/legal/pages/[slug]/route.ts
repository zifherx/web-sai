import { type SlugContext } from "@/modules/legal/helpers/legal.helper"
import { getLegalPageHandler } from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const GET = (req: NextRequest, ctx: SlugContext) =>
  getLegalPageHandler(req, ctx)
