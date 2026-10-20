import { reorderLegalPromotionsHandler } from "@/modules/legal/presentation/legal.controller"
import { type NextRequest } from "next/server"

export const PATCH = (req: NextRequest) => reorderLegalPromotionsHandler(req)
