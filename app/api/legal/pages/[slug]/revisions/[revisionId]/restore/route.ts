import { type SlugRevisionContext } from "@/modules/legal/helpers/legal.helper"
import { restoreLegalPageRevisionHandler } from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const POST = (req: NextRequest, ctx: SlugRevisionContext) =>
  restoreLegalPageRevisionHandler(req, ctx)
