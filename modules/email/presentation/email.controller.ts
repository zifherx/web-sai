import { ResponseFactory } from "@/lib"
import {
  SendCitaEmailSchema,
  SendLeadCorporativoEmailSchema,
  SendReclamoEmailSchema,
} from "@/modules/email/application/dto/email.dto"
import { emailFactory } from "@/modules/email/factories/email.factory"
import { withRateLimitHeaders } from "@/modules/email/helpers/email.helper"
import { emailRateLimit } from "@/modules/email/presentation/email.ratelimit"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { NextRequest } from "next/server"

/**
 * POST /api/email/cita
 *
 * Envía email de confirmación de cita al cliente y al área "Citas".
 * Lanza `EmailAreaNotConfiguredError` (422) si el área no está configurada.
 */
export function sendCitaEmailHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await emailRateLimit(req)
    if (!rl.allowed) return rl.response!

    await connectDB()
    const body = SendCitaEmailSchema.parse(await req.json())
    const useCases = emailFactory()
    const data = await useCases.sendCita.execute(body)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Email de cita enviado"),
      rl.headers
    )
  })
}

/**
 * POST /api/email/lead-corporativo
 *
 * Envía email de notificación al área "Corporativo".
 * Lanza `EmailAreaNotConfiguredError` (422) si el área no está configurada.
 */
export function sendLeadCorporativoEmailHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await emailRateLimit(req)
    if (!rl.allowed) return rl.response!

    await connectDB()
    const body = SendLeadCorporativoEmailSchema.parse(await req.json())
    const useCases = emailFactory()
    const data = await useCases.sendLeadCorporativo.execute(body)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Email corporativo enviado"),
      rl.headers
    )
  })
}

/**
 * POST /api/email/reclamo
 *
 * Envía email de reclamo con PDF adjunto al área "Reclamos".
 * El PDF llega en base64 y el use-case lo convierte a Buffer.
 * Lanza `EmailAreaNotConfiguredError` (422) si el área no está configurada.
 */
export function sendReclamoEmailHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await emailRateLimit(req)
    if (!rl.allowed) return rl.response!

    await connectDB()
    const body = SendReclamoEmailSchema.parse(await req.json())
    const useCases = emailFactory()
    const data = await useCases.sendReclamo.execute(body)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Email de reclamo enviado"),
      rl.headers
    )
  })
}
