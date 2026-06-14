import { ResponseFactory } from "@/lib"
import {
  CreateSystemEmailSchema,
  SystemEmailAreaSchema,
  SystemEmailIdSchema,
} from "@/modules/system-email/application/dto/system-email.dto"
import { systemEmailFactory } from "@/modules/system-email/factories/system-email.factory"
import {
  AreaContext,
  IdContext,
  resolveUserId,
  withRateLimitHeaders,
} from "@/modules/system-email/helpers/system-email.helper"
import { systemEmailRateLimit } from "@/modules/system-email/presentation/system-email.ratelimit"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { NextRequest } from "next/server"

/**
 * GET /api/system-emails
 *
 * Lista todos los emails del sistema (activos e inactivos).
 * Solo CMS autenticado — configuración interna.
 * Tier "cms-read" → 20 req/60s por userId.
 */
export function getAllSystemEmailsHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await systemEmailRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    await connectDB()
    const useCases = systemEmailFactory()
    const data = await useCases.getAll.execute()

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Emails de sistema obtenidos"),
      rl.headers
    )
  })
}

/**
 * GET /api/system-emails/[id]
 *
 * Detalle de un email de sistema por ObjectId.
 * Solo CMS autenticado. Tier "cms-read".
 */
export function getSystemEmailByIdHandler(req: NextRequest, ctx: IdContext) {
  return withHandler(async () => {
    const rl = await systemEmailRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const { id } = SystemEmailIdSchema.parse(await ctx.params)
    await connectDB()
    const useCases = systemEmailFactory()
    const data = await useCases.getById.execute(id)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Email de sistema obtenido"),
      rl.headers
    )
  })
}

/**
 * GET /api/system-emails/area/[area]
 *
 * Lookup del email activo para un área específica del sistema.
 * Solo CMS autenticado — para verificar configuración de áreas.
 * Retorna DTO reducido (solo area + email).
 * Tier "cms-read".
 */
export function getSystemEmailByAreaHandler(
  req: NextRequest,
  ctx: AreaContext
) {
  return withHandler(async () => {
    const rl = await systemEmailRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const { area } = SystemEmailAreaSchema.parse(await ctx.params)
    await connectDB()
    const useCases = systemEmailFactory()
    const data = await useCases.getByArea.execute(area)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Email de área obtenido"),
      rl.headers
    )
  })
}

/**
 * POST /api/system-emails
 *
 * Registra un nuevo email de sistema para un área.
 * Solo CMS autenticado. Tier "authenticated" → 30 req/60s por userId.
 */
export function createSystemEmailHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await systemEmailRateLimit(req)
    if (!rl.allowed) return rl.response!

    const userId = resolveUserId(req)
    const body = CreateSystemEmailSchema.parse(await req.json())
    await connectDB()
    const useCases = systemEmailFactory()
    const data = await useCases.create.execute(body, userId)

    return withRateLimitHeaders(
      ResponseFactory.created(data, "Email de sistema creado"),
      rl.headers
    )
  })
}
