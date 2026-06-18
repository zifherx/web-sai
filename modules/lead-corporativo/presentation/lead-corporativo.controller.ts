import { ResponseFactory } from "@/lib"
import {
  CreateLeadCorporativoSchema,
  LeadCorporativoFiltersSchema,
  LeadCorporativoIdSchema,
} from "@/modules/lead-corporativo/application/dto/lead-corporativo.dto"
import { leadCorporativoFactory } from "@/modules/lead-corporativo/factories/lead-corporativo.factory"
import {
  resolveUserId,
  RouteContext,
  withRateLimitHeaders,
} from "@/modules/lead-corporativo/helpers/lead-corporativo.helpers"
import { leadCorporativoRateLimit } from "@/modules/lead-corporativo/presentation/lead-corporativo.ratelimit"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { NextRequest } from "next/server"

/**
 * GET /api/leads-corporativos
 *
 * Lista todos los leads B2B con filtros opcionales (marcaId, ciudad, sector).
 * Solo CMS autenticado — datos comerciales sensibles.
 * Tier "authenticated" → 30 req/60s por userId.
 */
export function getAllLeadsCorporativosHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await leadCorporativoRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    await connectDB()
    const filtersDTO = LeadCorporativoFiltersSchema.parse(
      Object.fromEntries(req.nextUrl.searchParams)
    )
    const useCases = leadCorporativoFactory()
    const data = await useCases.getAll.execute(filtersDTO)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Leads corporativos obtenidos"),
      rl.headers
    )
  })
}

/**
 * GET /api/leads-corporativos/[id]
 *
 * Detalle de un lead B2B por ObjectId. Solo CMS autenticado.
 * Tier "authenticated" → 30 req/60s por userId.
 */
export function getLeadCorporativoByIdHandler(
  req: NextRequest,
  ctx: RouteContext
) {
  return withHandler(async () => {
    const rl = await leadCorporativoRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const { id } = LeadCorporativoIdSchema.parse(await ctx.params)
    await connectDB()
    const useCases = leadCorporativoFactory()
    const data = await useCases.getById.execute(id)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Lead corporativo obtenido"),
      rl.headers
    )
  })
}

/**
 * POST /api/leads-corporativos
 *
 * Registra un nuevo lead de contacto B2B.
 * Endpoint PÚBLICO — empresas acceden sin autenticación desde el frontend.
 * Tier "public-write" → 10 req/60s por IP (anti-spam del formulario).
 */
export function createLeadCorporativoHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await leadCorporativoRateLimit(req)
    if (!rl.allowed) return rl.response!

    const body = CreateLeadCorporativoSchema.parse(await req.json())
    await connectDB()
    const useCases = leadCorporativoFactory()
    const data = await useCases.create.execute(body)

    return withRateLimitHeaders(
      ResponseFactory.created(data, "Lead corporativo registrado exitosamente"),
      rl.headers
    )
  })
}
