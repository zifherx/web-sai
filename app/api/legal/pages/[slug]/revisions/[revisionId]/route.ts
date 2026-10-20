import { type SlugRevisionContext } from "@/modules/legal/helpers/legal.helper"
import { getLegalPageRevisionHandler } from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const GET = (req: NextRequest, ctx: SlugRevisionContext) =>
  getLegalPageRevisionHandler(req, ctx)
