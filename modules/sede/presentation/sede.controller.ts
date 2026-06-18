import { ResponseFactory } from "@/lib"
import {
  CreateSedeSchema,
  SedeFiltersSchema,
  SedeIdSchema,
  SedeSlugSchema,
  UpdateSedeSchema,
} from "@/modules/sede/application/dtos/sede.dto"
import { sedeFactory } from "@/modules/sede/factories/sede.factory"
import {
  IdContext,
  MarcaContext,
  resolveUserId,
  SlugContext,
  withRateLimitHeaders,
} from "@/modules/sede/helpers/sede.helper"
import { sedeRateLimit } from "@/modules/sede/presentation/sede.ratelimit"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { NextRequest } from "next/server"

/**
 * GET /api/sedes
 *
 * Acepta filtros via query params: ciudad, isActive, isTaller,
 * marcaVentaId, marcaTallerId. Validados con `SedeFiltersSchema`.
 *
 * Consumidores:
 *   - Frontend público / ISR → tier "public"   (100 req/60s por IP)
 *   - CMS autenticado        → tier "cms-read" (20 req/60s por userId)
 */
export function getAllSedesHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await sedeRateLimit(req)
    if (!rl.allowed) return rl.response!

    await connectDB()
    const filtersDTO = SedeFiltersSchema.parse(
      Object.fromEntries(req.nextUrl.searchParams)
    )
    const useCases = sedeFactory()
    const data = await useCases.getAll.execute(filtersDTO)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Sedes obtenidas"),
      rl.headers
    )
  })
}

/**
 * GET /api/sedes/active
 *
 * Solo sedes activas. Acepta los mismos filtros que getAll excepto `isActive`.
 */
export function getActiveSedesHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await sedeRateLimit(req)
    if (!rl.allowed) return rl.response!

    await connectDB()
    const { isActive: _, ...rest } = SedeFiltersSchema.parse(
      Object.fromEntries(req.nextUrl.searchParams)
    )
    const useCases = sedeFactory()
    const data = await useCases.getActive.execute(rest)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Sedes activas obtenidas"),
      rl.headers
    )
  })
}

/**
 * GET /api/sedes/talleres
 *
 * Lista sedes que operan como taller de servicio (isTaller=true, isActive=true).
 * Endpoint dedicado para el buscador de talleres del frontend.
 */
export function getTalleresHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await sedeRateLimit(req)
    if (!rl.allowed) return rl.response!

    await connectDB()
    const useCases = sedeFactory()
    const data = await useCases.getTalleres.execute()

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Talleres obtenidos"),
      rl.headers
    )
  })
}

/**
 * GET /api/sedes/slug/[slug]
 *
 * Lookup por slug público. Usado en páginas de detalle del frontend
 * y en el mapa Leaflet para cargar datos de una sede específica.
 */
export function getSedeBySlugHandler(req: NextRequest, ctx: SlugContext) {
  return withHandler(async () => {
    const rl = await sedeRateLimit(req)
    if (!rl.allowed) return rl.response!

    const { slug } = SedeSlugSchema.parse(await ctx.params)
    await connectDB()
    const useCases = sedeFactory()
    const data = await useCases.getBySlug.execute(slug)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Sede obtenida"),
      rl.headers
    )
  })
}

/**
 * GET /api/sedes/marca/[marca]
 *
 * Retorna las sedes de ventas disponibles para una marca dado su nombre.
 * El use-case resuelve nombre→slug→ID internamente. Si la marca no existe,
 * retorna lista vacía (sin error 404) — el frontend maneja "sin sedes".
 */
export function getSedesByMarcaHandler(req: NextRequest, ctx: MarcaContext) {
  return withHandler(async () => {
    const rl = await sedeRateLimit(req)
    if (!rl.allowed) return rl.response!

    const { marca } = await ctx.params
    await connectDB()
    const useCases = sedeFactory()
    const data = await useCases.getByMarca.execute(marca)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Sedes por marca obtenidas"),
      rl.headers
    )
  })
}

/**
 * GET /api/sedes/[id]
 *
 * Lookup por ObjectId de MongoDB. Usado desde el CMS para
 * cargar el formulario de edición de una sede.
 */
export function getSedeByIdHandler(req: NextRequest, ctx: IdContext) {
  return withHandler(async () => {
    const rl = await sedeRateLimit(req)
    if (!rl.allowed) return rl.response!

    const { sedeId } = SedeIdSchema.parse(await ctx.params)
    await connectDB()
    const useCases = sedeFactory()
    const data = await useCases.getById.execute(sedeId)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Sede obtenida"),
      rl.headers
    )
  })
}

/**
 * POST /api/sedes
 *
 * Crea una nueva sede. Solo CMS autenticado.
 * Tier "authenticated" → 30 req/60s por userId.
 */
export function createSedeHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await sedeRateLimit(req)
    if (!rl.allowed) return rl.response!

    const userId = resolveUserId(req)
    const body = CreateSedeSchema.parse(await req.json())
    await connectDB()
    const useCases = sedeFactory()
    const data = await useCases.create.execute(body, userId)

    return withRateLimitHeaders(
      ResponseFactory.created(data, "Sede creada"),
      rl.headers
    )
  })
}

/**
 * PATCH /api/sedes/[id]
 *
 * Actualización parcial — todos los campos son opcionales.
 * Valida unicidad de slug excluyendo el propio registro.
 * Solo CMS autenticado. Tier "authenticated".
 */
export function updateSedeHandler(req: NextRequest, ctx: IdContext) {
  return withHandler(async () => {
    const rl = await sedeRateLimit(req)
    if (!rl.allowed) return rl.response!

    const userId = resolveUserId(req)
    const { sedeId } = SedeIdSchema.parse(await ctx.params)
    const body = UpdateSedeSchema.parse(await req.json())
    await connectDB()
    const useCases = sedeFactory()
    const data = await useCases.update.execute(sedeId, body)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Sede actualizada"),
      rl.headers
    )
  })
}

/**
 * DELETE /api/sedes/[id]
 *
 * Eliminación física. Solo CMS autenticado. Tier "authenticated".
 */
export function deleteSedeHandler(req: NextRequest, ctx: IdContext) {
  return withHandler(async () => {
    const rl = await sedeRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const { sedeId } = SedeIdSchema.parse(await ctx.params)
    await connectDB()
    const useCases = sedeFactory()
    const data = await useCases.delete.execute(sedeId)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Sede eliminada"),
      rl.headers
    )
  })
}
