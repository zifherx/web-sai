import { ResponseFactory } from "@/lib"
import {
  CreateMarcaSchema,
  MarcaIdSchema,
  MarcaSlugSchema,
  UpdateMarcaSchema,
} from "@/modules/marca/application/dtos/marca.dto"
import { marcaFactory } from "@/modules/marca/factories/marca.factory"
import {
  RouteContext,
  SlugContext,
  resolveUserId,
  withRateLimitHeaders,
} from "@/modules/marca/helpers/marca.helper"
import { marcaRateLimit } from "@/modules/marca/presentation/marca.ratelimit"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { NextRequest } from "next/server"

/**
 * GET /api/marcas
 *
 * Acepta query params como filtros opcionales (`?isActive=true`).
 * Consumidores:
 *   - Frontend público / ISR → tier "public"   (100 req/60s por IP)
 *   - CMS autenticado        → tier "cms-read" (20 req/60s por userId)
 */
export function getAllMarcasHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await marcaRateLimit(req)
    if (!rl.allowed) return rl.response!

    await connectDB()
    const filter = Object.fromEntries(req.nextUrl.searchParams)
    const useCases = marcaFactory()
    const data = await useCases.getAll.execute(filter)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Marcas obtenidas"),
      rl.headers
    )
  })
}

/**
 * GET /api/marcas/active
 *
 * Endpoint público optimizado para el frontend — solo marcas activas,
 * ordenadas por nombre. Evita filtros arbitrarios en el listado general.
 */
export function getActiveMarcasHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await marcaRateLimit(req)
    if (!rl.allowed) return rl.response!

    await connectDB()
    const useCases = marcaFactory()
    const data = await useCases.getActive.execute()

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Marcas activas obtenidas"),
      rl.headers
    )
  })
}

/**
 * GET /api/marcas/[id]
 *
 * Lookup por ObjectId de MongoDB. Usado principalmente desde el CMS
 * para cargar el formulario de edición de una marca específica.
 */
export function getMarcaByIdHandler(req: NextRequest, ctx: RouteContext) {
  return withHandler(async () => {
    const rl = await marcaRateLimit(req)
    if (!rl.allowed) return rl.response!

    const { id } = MarcaIdSchema.parse(await ctx.params)
    await connectDB()
    const useCases = marcaFactory()
    const data = await useCases.getById.execute(id)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Marca obtenida"),
      rl.headers
    )
  })
}

/**
 * GET /api/marcas/slug/[slug]
 *
 * Lookup por slug público. Usado desde el frontend para las páginas
 * de detalle de marca (`/marcas/toyota`). Ruta separada de `[id]`
 * para mantener semántica clara y evitar bifurcaciones en el handler.
 */
export function getMarcaBySlugHandler(req: NextRequest, ctx: SlugContext) {
  return withHandler(async () => {
    const rl = await marcaRateLimit(req)
    if (!rl.allowed) return rl.response!

    const { slug } = MarcaSlugSchema.parse(await ctx.params)
    await connectDB()
    const useCases = marcaFactory()
    const data = await useCases.getBySlug.execute(slug)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Marca obtenida"),
      rl.headers
    )
  })
}

/**
 * POST /api/marcas
 *
 * Crea una nueva marca. Solo CMS autenticado.
 * Tier "authenticated" → 30 req/60s por userId.
 */
export function createMarcaHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await marcaRateLimit(req)
    if (!rl.allowed) return rl.response!

    const userId = resolveUserId(req)
    const body = CreateMarcaSchema.parse(await req.json())
    await connectDB()
    const useCases = marcaFactory()
    const data = await useCases.create.execute(body, userId)

    return withRateLimitHeaders(
      ResponseFactory.created(data, "Marca creada"),
      rl.headers
    )
  })
}

/**
 * PATCH /api/marcas/[id]
 *
 * Actualización parcial. Todos los campos de `UpdateMarcaSchema` son opcionales.
 * Solo CMS autenticado. Tier "authenticated".
 */
export function updateMarcaHandler(req: NextRequest, ctx: RouteContext) {
  return withHandler(async () => {
    const rl = await marcaRateLimit(req)
    if (!rl.allowed) return rl.response!

    const userId = resolveUserId(req)
    const { id } = MarcaIdSchema.parse(await ctx.params)
    const body = UpdateMarcaSchema.parse(await req.json())
    await connectDB()
    const useCases = marcaFactory()
    const data = await useCases.update.execute(id, body)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Marca actualizada"),
      rl.headers
    )
  })
}

/**
 * DELETE /api/marcas/[id]
 *
 * Eliminación física. Solo CMS autenticado. Tier "authenticated".
 */
export function deleteMarcaHandler(req: NextRequest, ctx: RouteContext) {
  return withHandler(async () => {
    const rl = await marcaRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const { id } = MarcaIdSchema.parse(await ctx.params)
    await connectDB()
    const useCases = marcaFactory()
    const data = await useCases.delete.execute(id)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Marca eliminada"),
      rl.headers
    )
  })
}
