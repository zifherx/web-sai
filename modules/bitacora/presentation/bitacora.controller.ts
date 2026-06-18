import { ResponseFactory } from "@/lib"
import { BitacoraFiltersSchema } from "@/modules/bitacora/application/dto/bitacora.dto"
import { bitacoraFactory } from "@/modules/bitacora/factories/bitacora.factory"
import {
  resolveUserId,
  withRateLimitHeaders,
} from "@/modules/bitacora/helpers/bitacora.helper"
import { bitacoraRateLimit } from "@/modules/bitacora/presentation/bitacora.ratelimit"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { NextRequest } from "next/server"

/**
 * GET /api/bitacoras
 *
 * Lista los registros de auditoría de llamadas a Novaly.
 * Solo CMS autenticado — datos internos de integración.
 * Tier "cms-read" → 20 req/60s por userId.
 *
 * Filtros opcionales: from, to (ISO dates), responseCode (HTTP status code).
 * Ordenados por fecha de creación descendente.
 */
export function getAllBitacorasHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await bitacoraRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    await connectDB()
    const filtersDTO = BitacoraFiltersSchema.parse(
      Object.fromEntries(req.nextUrl.searchParams)
    )
    const useCases = bitacoraFactory()
    const data = await useCases.getAll.execute(filtersDTO)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Bitácoras obtenidas"),
      rl.headers
    )
  })
}
