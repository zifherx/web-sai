import { ResponseFactory } from "@/lib"
import { NovalyPayloadSchema } from "@/modules/novaly/application/dto/novaly.dto"
import { novalyFactory } from "@/modules/novaly/factories/novaly-factory"
import { withRateLimitHeaders } from "@/modules/novaly/helpers/novaly.helper"
import { novalyRateLimit } from "@/modules/novaly/presentation/novaly.ratelimit"
import { withHandler } from "@/shared/presentation/with-handler"
import { NextRequest } from "next/server"

/**
 * POST /api/novaly
 *
 * Recibe el payload del formulario del frontend, lo valida, lo mapea
 * y lo envía a la API externa de Novaly.
 *
 * Endpoint PÚBLICO — formularios de cotización sin autenticación Clerk.
 * Tier "public-write" → 10 req/60s por IP.
 *
 * El logging de bitácora ocurre dentro del use-case (fire & forget).
 * Los errores de Novaly (`NovalyApiError`) son manejados por `withHandler`
 * vía `ResponseFactory.error`, que respeta el `statusCode` del DomainError.
 */
export function enviarLeadNovalyHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await novalyRateLimit(req)
    if (!rl.allowed) return rl.response!

    const body = NovalyPayloadSchema.parse(await req.json())
    const useCases = novalyFactory()
    const data = await useCases.enviarLead.execute(body)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Lead enviado correctamente"),
      rl.headers
    )
  })
}
