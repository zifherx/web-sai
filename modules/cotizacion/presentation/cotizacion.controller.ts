import { ResponseFactory } from "@/lib"
import {
  CotizacionFiltersSchema,
  CotizacionIdSchema,
  CreateCotizacionSchema,
} from "@/modules/cotizacion/application/dto/cotizacion.dto"
import { cotizacionFactory } from "@/modules/cotizacion/factories/cotizacion.factory"
import {
  resolveUserId,
  RouteContext,
  withRateLimitHeaders,
} from "@/modules/cotizacion/helpers/cotizacion.helper"
import { cotizacionRateLimit } from "@/modules/cotizacion/presentation/cotizacion.rate-limit"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { NextRequest } from "next/server"

/**
 * GET /api/cotizaciones
 *
 * Lista cotizaciones con filtros opcionales (from, to, sedeId, intencionCompra).
 * Solo CMS autenticado — contiene datos personales de clientes.
 * Tier "authenticated" → 30 req/60s por userId.
 */
export function getAllCotizacionesHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await cotizacionRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    await connectDB()
    const filtersDTO = CotizacionFiltersSchema.parse(
      Object.fromEntries(req.nextUrl.searchParams)
    )
    const useCases = cotizacionFactory()
    const data = await useCases.getAll.execute(filtersDTO)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Cotizaciones obtenidas"),
      rl.headers
    )
  })
}

/**
 * GET /api/cotizaciones/[id]
 *
 * Detalle de una cotización con cliente, vehículo y sede populados.
 * Solo CMS autenticado. Tier "authenticated".
 */
export function getCotizacionByIdHandler(req: NextRequest, ctx: RouteContext) {
  return withHandler(async () => {
    const rl = await cotizacionRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const { id } = CotizacionIdSchema.parse(await ctx.params)
    await connectDB()
    const useCases = cotizacionFactory()
    const data = await useCases.getById.execute(id)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Cotización obtenida"),
      rl.headers
    )
  })
}

/**
 * POST /api/cotizaciones
 *
 * Crea una nueva cotización desde el wizard del frontend.
 * Endpoint PÚBLICO — clientes acceden sin autenticación Clerk.
 * Tier "public-write" → 10 req/60s por IP.
 *
 * El use-case hace upsert del cliente y persiste la cotización
 * con los IDs directos (vehiculoId, sedeId) enviados por el frontend.
 */
export function createCotizacionHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await cotizacionRateLimit(req)
    if (!rl.allowed) return rl.response!

    const body = CreateCotizacionSchema.parse(await req.json())
    await connectDB()
    const useCases = cotizacionFactory()
    const data = await useCases.create.execute(body)

    return withRateLimitHeaders(
      ResponseFactory.created(data, "Cotización registrada exitosamente"),
      rl.headers
    )
  })
}
