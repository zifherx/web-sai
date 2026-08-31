import { ResponseFactory } from "@/lib"
import {
  CarroceriaIdSchema,
  CreateCarroceriaSchema,
  UpdateCarroceriaSchema,
} from "@/modules/carroceria/application/dto/carroceria.dto"
import { CarroceriaUnauthorizedError } from "@/modules/carroceria/domain/errors/CarroceriaDomainError"
import { carroceriaFactory } from "@/modules/carroceria/factories/carroceria.factory"
import { withRateLimitHeaders } from "@/modules/carroceria/helpers/carroceria.helper"
import { carroceriaRateLimit } from "@/modules/carroceria/presentation/carroceria.ratelimit"
import { resolveUserId } from "@/shared/infrastructure/auth/resolve-user-id"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { type NextRequest } from "next/server"

type RouteContext = { params: Promise<{ id: string }> }

/**
 * GET /api/carrocerias
 *
 * Consumidores:
 *   - Frontend público / ISR → tier "public"  (100 req/60s por IP)
 *   - CMS autenticado        → tier "cms-read" (20 req/60s por userId)
 */
export async function getAllCarroceriasHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await carroceriaRateLimit(req)
    if (!rl.allowed) return rl.response!

    await connectDB()
    const filter = Object.fromEntries(req.nextUrl.searchParams)
    const useCases = carroceriaFactory()
    const data = await useCases.getAll.execute(filter)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Carrocerías obtenidas"),
      rl.headers
    )
  })
}

/**
 * GET /api/carrocerias/active
 * Devuelve únicamente las carrocerías activas.
 */
export function getActiveCarroceriasHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await carroceriaRateLimit(req)
    if (!rl.allowed) return rl.response!

    await connectDB()
    const useCases = carroceriaFactory()
    const data = await useCases.getActive.execute()

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Carrocerías activas obtenidas"),
      rl.headers
    )
  })
}

/**
 * GET /api/carrocerias/[id]
 * Devuelve una carrocería por su id de MongoDB.
 */
export function getCarroceriaByIdHandler(req: NextRequest, ctx: RouteContext) {
  return withHandler(async () => {
    const rl = await carroceriaRateLimit(req)
    if (!rl.allowed) return rl.response!

    const { marcaId } = CarroceriaIdSchema.parse(await ctx.params)
    await connectDB()
    const useCases = carroceriaFactory()
    const data = await useCases.getById.execute(marcaId)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Carrocería obtenida"),
      rl.headers
    )
  })
}

/**
 * POST /api/carrocerias
 *
 * Solo CMS autenticado → tier "authenticated" (30 req/60s por userId).
 * Valida body con `CreateCarroceriaSchema` antes del use-case.
 */
export function createCarroceriaHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await carroceriaRateLimit(req)
    if (!rl.allowed) return rl.response!

    const userId = await resolveUserId(req)
    if (!userId) throw new CarroceriaUnauthorizedError()
    const body = CreateCarroceriaSchema.parse(await req.json())
    await connectDB()
    const useCases = carroceriaFactory()
    const data = await useCases.create.execute(body, userId)

    return withRateLimitHeaders(
      ResponseFactory.created(data, "Carrocería creada"),
      rl.headers
    )
  })
}

/**
 * PATCH /api/carrocerias/[id]
 *
 * Actualización parcial — todos los campos de `UpdateCarroceriaSchema` son opcionales.
 * Solo CMS autenticado → tier "authenticated".
 */
export function updateCarroceriaHandler(req: NextRequest, ctx: RouteContext) {
  return withHandler(async () => {
    const rl = await carroceriaRateLimit(req)
    if (!rl.allowed) return rl.response!

    const userId = await resolveUserId(req)
    if (!userId) throw new CarroceriaUnauthorizedError()
    const { marcaId } = CarroceriaIdSchema.parse(await ctx.params)
    const body = UpdateCarroceriaSchema.parse(await req.json())
    await connectDB()
    const useCases = carroceriaFactory()
    const data = await useCases.update.execute(marcaId, body)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Carrocería actualizada"),
      rl.headers
    )
  })
}

/**
 * DELETE /api/carrocerias/[id]
 *
 * Eliminación física. Solo CMS autenticado → tier "authenticated".
 */
export function deleteCarroceriaHandler(req: NextRequest, ctx: RouteContext) {
  return withHandler(async () => {
    const rl = await carroceriaRateLimit(req)
    if (!rl.allowed) return rl.response!

    const userId = await resolveUserId(req)
    if (!userId) throw new CarroceriaUnauthorizedError()
    const { marcaId } = CarroceriaIdSchema.parse(await ctx.params)
    await connectDB()
    const useCases = carroceriaFactory()
    const data = await useCases.delete.execute(marcaId)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Carrocería eliminada"),
      rl.headers
    )
  })
}
