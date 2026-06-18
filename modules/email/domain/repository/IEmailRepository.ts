import {
  SendCitaEmailParams,
  SendEmailResult,
  SendLeadCorporativoEmailParams,
  SendReclamoEmailParams,
} from "@/modules/email/domain/types/EmailTypes"

/**
 * Puerto de salida secundario para el envío de emails transaccionales.
 *
 * Define el contrato que cualquier proveedor de email debe cumplir.
 * La implementación concreta (`ResendEmailAdapter`) vive en infrastructure.
 * El use-case conoce este puerto, no el SDK de Resend.
 */
export interface IEmailPort {
  sendCita(params: SendCitaEmailParams): Promise<SendEmailResult>
  sendLeadCorporativo(
    params: SendLeadCorporativoEmailParams
  ): Promise<SendEmailResult>
  sendReclamo(params: SendReclamoEmailParams): Promise<SendEmailResult>
}
