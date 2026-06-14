import { ResponseFactory } from "@/lib"
import {
  CreatePortadaSchema,
  PortadaIdSchema,
  UpdatePortadaSchema,
} from "@/modules/portada/application/dtos/portada.dto"
import { portadaFactory } from "@/modules/portada/factories/portada.factory"
import {
  RouteContext,
  resolveUserId,
  withRateLimitHeaders,
} from "@/modules/portada/helpers/portada.helper"
import { portadaRateLimit } from "@/modules/portada/presentation/portada.ratelimit"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { NextRequest } from "next/server"

/**
 * GET /api/portadas
 *
 * Acepta query params como filtros opcionales.
 * Consumidores:
 *   - Frontend público / ISR → tier "public"   (100 req/60s por IP)
 *   - CMS autenticado        → tier "cms-read" (20 req/60s por userId)
 */
export function getAllPortadasHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await portadaRateLimit(req)
    if (!rl.allowed) return rl.response!

    await connectDB()
    const filter = Object.fromEntries(req.nextUrl.searchParams)
    const useCases = portadaFactory()
    const data = await useCases.getAll.execute(filter)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Portadas obtenidas"),
      rl.headers
    )
  })
}

/**
 * GET /api/portadas/active
 *
 * Endpoint optimizado para el frontend — devuelve solo las portadas activas.
 * Aprovecha el índice `{ isActive: 1 }` definido en el schema.
 */
export function getActivePortadasHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await portadaRateLimit(req)
    if (!rl.allowed) return rl.response!

    await connectDB()
    const useCases = portadaFactory()
    const data = await useCases.getActive.execute()

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Portadas activas obtenidas"),
      rl.headers
    )
  })
}

/**
 * GET /api/portadas/[id]
 *
 * Lookup por ObjectId de MongoDB. Usado desde el CMS para cargar
 * el formulario de edición de una portada específica.
 */
export function getPortadaByIdHandler(req: NextRequest, ctx: RouteContext) {
  return withHandler(async () => {
    const rl = await portadaRateLimit(req)
    if (!rl.allowed) return rl.response!

    const { portadaId } = PortadaIdSchema.parse(await ctx.params)
    await connectDB()
    const useCases = portadaFactory()
    const data = await useCases.getById.execute(portadaId)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Portada obtenida"),
      rl.headers
    )
  })
}

/**
 * POST /api/portadas
 *
 * Crea una nueva portada. Solo CMS autenticado.
 * Tier "authenticated" → 30 req/60s por userId.
 */
export function createPortadaHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await portadaRateLimit(req)
    if (!rl.allowed) return rl.response!

    const userId = resolveUserId(req)
    const body = CreatePortadaSchema.parse(await req.json())
    await connectDB()
    const useCases = portadaFactory()
    const data = await useCases.create.execute(body, userId)

    return withRateLimitHeaders(
      ResponseFactory.created(data, "Portada creada"),
      rl.headers
    )
  })
}

/**
 * PATCH /api/portadas/[id]
 *
 * Actualización parcial. Todos los campos son opcionales.
 * Solo CMS autenticado. Tier "authenticated".
 */
export function updatePortadaHandler(req: NextRequest, ctx: RouteContext) {
  return withHandler(async () => {
    const rl = await portadaRateLimit(req)
    if (!rl.allowed) return rl.response!

    const userId = resolveUserId(req)
    const { portadaId } = PortadaIdSchema.parse(await ctx.params)
    const body = UpdatePortadaSchema.parse(await req.json())
    await connectDB()
    const useCases = portadaFactory()
    const data = await useCases.update.execute(portadaId, body)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Portada actualizada"),
      rl.headers
    )
  })
}

/**
 * DELETE /api/portadas/[id]
 *
 * Eliminación física. Solo CMS autenticado. Tier "authenticated".
 */
export function deletePortadaHandler(req: NextRequest, ctx: RouteContext) {
  return withHandler(async () => {
    const rl = await portadaRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const { portadaId } = PortadaIdSchema.parse(await ctx.params)
    await connectDB()
    const useCases = portadaFactory()
    const data = await useCases.delete.execute(portadaId)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Portada eliminada"),
      rl.headers
    )
  })
}
