import { IEmailPort } from "@/modules/email/domain/repository/IEmailRepository"
import {
  SendCitaEmailParams,
  SendEmailResult,
  SendLeadCorporativoEmailParams,
  SendReclamoEmailParams,
} from "@/modules/email/domain/types/EmailTypes"
import { type CreateEmailOptions, Resend } from "resend"
import { CitaEmailTemplate } from "../templates/cita-email-template"

const FROM = "Automotores Inka 🤖 <bot@ziphonex.com>"
const BCC_DEFAULT = "automotores.inka@ziphonex.com"

/**
 * Adaptador de salida de email usando el SDK de Resend.
 *
 * Implementa `IEmailPort` — la interfaz que los use-cases conocen.
 * Todo el conocimiento sobre Resend, headers, BCC y adjuntos vive aquí.
 *
 * No lanza errores — retorna `SendEmailResult` con `success: false` y `error`
 * para que el use-case decida si es un error crítico o tolerable.
 */
export class ResendEmailAdapter implements IEmailPort {
  private readonly resend: Resend

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY)
  }

  private async send(options: CreateEmailOptions): Promise<SendEmailResult> {
    try {
      const { data, error } = await this.resend.emails.send(options)
      if (error) {
        console.error("[ResendEmailAdapter] error:", error)
        return { success: false, error: error.message }
      }
      return { success: true, id: data?.id }
    } catch (err: any) {
      console.error("[ResendEmailAdapter] unexpected error:", err.message)
      return { success: false, error: err.message }
    }
  }

  async sendCita(params: SendCitaEmailParams): Promise<SendEmailResult> {
    return this.send({
      from: FROM,
      to: [params.areaEmail],
      bcc: [BCC_DEFAULT, params.clienteEmail].filter(Boolean),
      subject: `Nueva Cita ✅ — ${params.numeroDocumento}`,
      react: CitaEmailTemplate(params),
      text: `Nueva cita de ${params.clienteNombre} (${params.numeroDocumento}) - ${params.tipoServicio} en ${params.sedeName}`,
    })
  }

  async sendLeadCorporativo(
    params: SendLeadCorporativoEmailParams
  ): Promise<SendEmailResult> {
    return this.send({
      from: FROM,
      to: [params.areaEmail],
      bcc: [BCC_DEFAULT],
      subject: `Lead Corporativo ✅ — ${params.ruc}`,
      react: params.reactTemplate ?? undefined,
      text: `Nuevo lead corporativo de ${params.razonSocial}`,
    })
  }

  async sendReclamo(params: SendReclamoEmailParams): Promise<SendEmailResult> {
    const bcc = [BCC_DEFAULT, params.clienteEmail ?? ""].filter(Boolean)
    return this.send({
      from: FROM,
      to: [params.areaEmail],
      bcc,
      subject: `Nuevo Reclamo ❗ — ${params.numeroDocumento}`,
      react: params.reactTemplate ?? undefined,
      text: `Nuevo reclamo de ${params.clienteNombre}`,
      attachments: [
        {
          filename: `${params.numeroReclamo}-${params.numeroDocumento}.pdf`,
          content: params.pdfBuffer,
        },
      ],
    })
  }
}
