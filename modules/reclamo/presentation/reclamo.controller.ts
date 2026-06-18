import { ResponseFactory } from "@/lib"
import {
  CreateReclamoSchema,
  ReclamoFiltersSchema,
  ReclamoIdSchema,
} from "@/modules/reclamo/application/dtos/reclamo.dto"
import { reclamoFactory } from "@/modules/reclamo/factories/reclamo.factory"
import {
  resolveUserId,
  RouteContext,
  withRateLimitHeaders,
} from "@/modules/reclamo/helpers/reclamo.helper"
import { reclamoRateLimit } from "@/modules/reclamo/presentation/reclamo.ratelimit"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { NextRequest } from "next/server"

/**
 * GET /api/reclamos
 *
 * Lista todos los reclamos con filtros opcionales (tipoSolicitud, sedeCodexHR, fecha).
 * Solo CMS autenticado — los reclamos son datos sensibles de clientes.
 * Tier "authenticated" → 30 req/60s por userId.
 */
export function getAllReclamosHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await reclamoRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    await connectDB()
    const filtersDTO = ReclamoFiltersSchema.parse(
      Object.fromEntries(req.nextUrl.searchParams)
    )
    const useCases = reclamoFactory()
    const data = await useCases.getAll.execute(filtersDTO)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Reclamos obtenidos"),
      rl.headers
    )
  })
}

/**
 * GET /api/reclamos/[id]
 *
 * Detalle de un reclamo por ObjectId. Solo CMS autenticado.
 * Tier "authenticated" → 30 req/60s por userId.
 */
export function getReclamoByIdHandler(req: NextRequest, ctx: RouteContext) {
  return withHandler(async () => {
    const rl = await reclamoRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const { id } = ReclamoIdSchema.parse(await ctx.params)
    await connectDB()
    const useCases = reclamoFactory()
    const data = await useCases.getById.execute(id)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Reclamo obtenido"),
      rl.headers
    )
  })
}

/**
 * POST /api/reclamos
 *
 * Crea un nuevo reclamo en el Libro de Reclamaciones.
 * Endpoint PÚBLICO — no requiere autenticación Clerk.
 * Tier "public-write" → 10 req/60s por IP (anti-spam del formulario).
 *
 * El número de reclamo correlativo se genera automáticamente en el use-case.
 */
export function createReclamoHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await reclamoRateLimit(req)
    if (!rl.allowed) return rl.response!

    const body = CreateReclamoSchema.parse(await req.json())
    await connectDB()
    const useCases = reclamoFactory()
    const data = await useCases.create.execute(body)

    return withRateLimitHeaders(
      ResponseFactory.created(data, "Reclamo registrado exitosamente"),
      rl.headers
    )
  })
}
