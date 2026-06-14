import { IBitacoraLogPort } from "@/modules/bitacora/domain/repositories/IBitacoraRepository"
import {
  NovalyRequestDTO,
  NovalyResponseDTO,
} from "@/modules/novaly/application/dto/novaly.dto"
import { NovalyMapper } from "@/modules/novaly/application/ports/novaly.mapper"
import { INovalyClient } from "@/modules/novaly/domain/repository/INovalyRepository"

/**
 * Caso de uso: Enviar un lead de cotización a la API externa de Novaly.
 *
 * Flujo:
 * 1. Mapea el DTO del frontend al payload que espera Novaly
 * 2. Llama al cliente HTTP de Novaly (`INovalyClient`)
 * 3. Registra el resultado en Bitácora (fire & forget — no interrumpe el flujo)
 * 4. Retorna el resultado al controller
 *
 * El manejo de errores HTTP de Novaly (4xx/5xx) ocurre en el adaptador
 * `NovalyHttpClient` — se convierte en `NovalyApiError` antes de llegar aquí.
 * `withHandler` en el controller lo convierte en la respuesta HTTP correcta.
 *
 * El use-case no conoce ni Axios ni Resend — solo sus puertos.
 */
export class EnviarLeadNovalyUseCase {
  constructor(
    private readonly novalyClient: INovalyClient,
    private readonly bitacoraLogger: IBitacoraLogPort
  ) {}

  async execute(dto: NovalyRequestDTO): Promise<NovalyResponseDTO> {
    const payload = NovalyMapper.toPayload(dto)

    const result = await this.novalyClient.enviarLead(payload)

    // Fire & forget — no await, no interrumpe el flujo si falla el logging
    this.bitacoraLogger
      .logSuccess(
        JSON.stringify(result.raw ?? result),
        200,
        "OK",
        "POST",
        "",
        payload
      )
      .catch((err) => console.error("[EnviarLeadNovaly] bitacora error:", err))

    return {
      success: result.success,
      message: result.message,
    }
  }
}
