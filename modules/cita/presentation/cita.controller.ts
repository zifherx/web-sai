import { ResponseFactory } from "@/lib"
import {
  CitaFiltersSchema,
  CitaIdSchema,
  CreateCitaSchema,
} from "@/modules/cita/application/dto/cita.dto"
import { citaFactory } from "@/modules/cita/factories/cita.factory"
import {
  resolveUserId,
  RouteContext,
  withRateLimitHeaders,
} from "@/modules/cita/helpers/cita.helper"
import { citaRateLimit } from "@/modules/cita/presentation/cita.ratelimit"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { NextRequest } from "next/server"

/**
 * GET /api/citas
 *
 * Lista todas las citas con filtros opcionales (sedeId, tipoServicio, from, to).
 * Solo CMS autenticado — las citas contienen datos personales de clientes.
 * Tier "authenticated" → 30 req/60s por userId.
 */
export function getAllCitasHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await citaRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    await connectDB()
    const filtersDTO = CitaFiltersSchema.parse(
      Object.fromEntries(req.nextUrl.searchParams)
    )
    const useCases = citaFactory()
    const data = await useCases.getAll.execute(filtersDTO)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Citas obtenidas"),
      rl.headers
    )
  })
}

/**
 * GET /api/citas/[id]
 *
 * Detalle de una cita por ObjectId con todos sus campos populados.
 * Solo CMS autenticado. Tier "authenticated".
 */
export function getCitaByIdHandler(req: NextRequest, ctx: RouteContext) {
  return withHandler(async () => {
    const rl = await citaRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const { id } = CitaIdSchema.parse(await ctx.params)
    await connectDB()
    const useCases = citaFactory()
    const data = await useCases.getById.execute(id)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Cita obtenida"),
      rl.headers
    )
  })
}

/**
 * POST /api/citas
 *
 * Agenda una nueva cita de servicio técnico.
 * Endpoint PÚBLICO — clientes acceden sin autenticación Clerk.
 * Tier "public-write" → 10 req/60s por IP (anti-spam del formulario).
 *
 * El use-case hace upsert del cliente y genera el mensaje de WhatsApp.
 */
export function createCitaHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await citaRateLimit(req)
    if (!rl.allowed) return rl.response!

    const body = CreateCitaSchema.parse(await req.json())
    await connectDB()
    const useCases = citaFactory()
    const data = await useCases.create.execute(body)

    return withRateLimitHeaders(
      ResponseFactory.created(data, "Cita agendada exitosamente"),
      rl.headers
    )
  })
}
