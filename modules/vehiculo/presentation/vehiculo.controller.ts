import { ResponseFactory } from "@/lib"
import {
  CreateVehiculoSchema,
  UpdateVehiculoSchema,
  VehiculoFiltersSchema,
  VehiculoIdSchema,
  VehiculoMarcaSchema,
  VehiculoSlugSchema,
} from "@/modules/vehiculo/application/dto/vehiculo.dto"
import { vehiculoFactory } from "@/modules/vehiculo/factories/vehiculo.factory"
import {
  IdContext,
  MarcaContext,
  resolveUserId,
  SlugContext,
  withRateLimitHeaders,
} from "@/modules/vehiculo/helpers/vehiculo.helper"
import { vehiculoRateLimit } from "@/modules/vehiculo/presentation/vehiculo.ratelimit"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { NextRequest } from "next/server"

/**
 * GET /api/vehiculos
 *
 * Lista vehículos con filtros opcionales: marcaId, carroceriaId, isActive,
 * isNuevo, isGLP, isLiquidacion, isEntrega48H, precioMin, precioMax, slug.
 * Ordenados por precio ascendente.
 *
 * Consumidores:
 *   - Frontend público / ISR → tier "public"   (100 req/60s por IP)
 *   - CMS autenticado        → tier "cms-read" (20 req/60s por userId)
 */
export function getAllVehiculosHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await vehiculoRateLimit(req)
    if (!rl.allowed) return rl.response!

    await connectDB()
    const filtersDTO = VehiculoFiltersSchema.parse(
      Object.fromEntries(req.nextUrl.searchParams)
    )
    const useCases = vehiculoFactory()
    const data = await useCases.getAll.execute(filtersDTO)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Vehículos obtenidos"),
      rl.headers
    )
  })
}

/**
 * GET /api/vehiculos/active
 *
 * Solo vehículos activos. Acepta los mismos filtros excepto `isActive`.
 * Endpoint optimizado para el frontend — catálogo público.
 */
export function getActiveVehiculosHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await vehiculoRateLimit(req)
    if (!rl.allowed) return rl.response!

    await connectDB()
    const { isActive: _, ...rest } = VehiculoFiltersSchema.parse(
      Object.fromEntries(req.nextUrl.searchParams)
    )
    const useCases = vehiculoFactory()
    const data = await useCases.getActive.execute(rest)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Vehículos activos obtenidos"),
      rl.headers
    )
  })
}

/**
 * GET /api/vehiculos/slug/[slug]
 *
 * Lookup por slug público. Para páginas de detalle del frontend (`/vehiculos/[slug]`).
 */
export function getVehiculoBySlugHandler(req: NextRequest, ctx: SlugContext) {
  return withHandler(async () => {
    const rl = await vehiculoRateLimit(req)
    if (!rl.allowed) return rl.response!

    const { slug } = VehiculoSlugSchema.parse(await ctx.params)
    await connectDB()
    const useCases = vehiculoFactory()
    const data = await useCases.getBySlug.execute(slug)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Vehículo obtenido"),
      rl.headers
    )
  })
}

/**
 * GET /api/vehiculos/marca/[marcaId]
 *
 * Vehículos activos de una marca. Para el catálogo por marca del frontend.
 */
export function getVehiculosByMarcaHandler(
  req: NextRequest,
  ctx: MarcaContext
) {
  return withHandler(async () => {
    const rl = await vehiculoRateLimit(req)
    if (!rl.allowed) return rl.response!

    const { marcaId } = VehiculoMarcaSchema.parse(await ctx.params)
    await connectDB()
    const useCases = vehiculoFactory()
    const data = await useCases.getByMarca.execute(marcaId)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Vehículos por marca obtenidos"),
      rl.headers
    )
  })
}

/**
 * GET /api/vehiculos/[id]
 *
 * Lookup por ObjectId. Para el formulario de edición del CMS.
 */
export function getVehiculoByIdHandler(req: NextRequest, ctx: IdContext) {
  return withHandler(async () => {
    const rl = await vehiculoRateLimit(req)
    if (!rl.allowed) return rl.response!

    const { vehiculoId } = VehiculoIdSchema.parse(await ctx.params)
    await connectDB()
    const useCases = vehiculoFactory()
    const data = await useCases.getById.execute(vehiculoId)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Vehículo obtenido"),
      rl.headers
    )
  })
}

/**
 * POST /api/vehiculos
 *
 * Crea un nuevo vehículo en el catálogo. Solo CMS autenticado.
 * Tier "authenticated" → 30 req/60s por userId.
 */
export function createVehiculoHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await vehiculoRateLimit(req)
    if (!rl.allowed) return rl.response!

    const userId = resolveUserId(req)
    const body = CreateVehiculoSchema.parse(await req.json())
    await connectDB()
    const useCases = vehiculoFactory()
    const data = await useCases.create.execute(body, userId)

    return withRateLimitHeaders(
      ResponseFactory.created(data, "Vehículo creado"),
      rl.headers
    )
  })
}

/**
 * PATCH /api/vehiculos/[id]
 *
 * Actualización parcial. Valida unicidad de slug excluyendo el propio registro.
 * Solo CMS autenticado. Tier "authenticated".
 */
export function updateVehiculoHandler(req: NextRequest, ctx: IdContext) {
  return withHandler(async () => {
    const rl = await vehiculoRateLimit(req)
    if (!rl.allowed) return rl.response!

    const userId = resolveUserId(req)
    const { vehiculoId } = VehiculoIdSchema.parse(await ctx.params)
    const body = UpdateVehiculoSchema.parse(await req.json())
    await connectDB()
    const useCases = vehiculoFactory()
    const data = await useCases.update.execute(vehiculoId, body)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Vehículo actualizado"),
      rl.headers
    )
  })
}

/**
 * DELETE /api/vehiculos/[id]
 *
 * Eliminación física. Solo CMS autenticado. Tier "authenticated".
 */
export function deleteVehiculoHandler(req: NextRequest, ctx: IdContext) {
  return withHandler(async () => {
    const rl = await vehiculoRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const { vehiculoId } = VehiculoIdSchema.parse(await ctx.params)
    await connectDB()
    const useCases = vehiculoFactory()
    const data = await useCases.delete.execute(vehiculoId)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Vehículo eliminado"),
      rl.headers
    )
  })
}
