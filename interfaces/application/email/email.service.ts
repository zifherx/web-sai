import type { CreateEmailOptions } from "resend"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = "Automotores Inka 🤖 <bot@ziphonex.com>"
const BCC_DEFAULT = "automotores.inka@ziphonex.com"

export interface SendEmailResult {
  success: boolean
  id?: string
  error?: string
}

export class EmailService {
  private async send(options: CreateEmailOptions): Promise<SendEmailResult> {
    try {
      const { data, error } = await resend.emails.send(options)
      if (error) {
        console.error("[EmailService] Resend error:", error)
        return { success: false, error: error.message }
      }
      return { success: true, id: data?.id }
    } catch (err: any) {
      console.error("[EmailService] Unexpected error:", err.message)
      return { success: false, error: err.message }
    }
  }

  async sendCita(params: {
    clienteEmail: string
    clienteNombre: string
    numeroDocumento: string
    areaEmail: string // viene de SystemEmailService.getByArea("Citas")
    reactTemplate?: React.ReactElement
  }): Promise<SendEmailResult> {
    return this.send({
      from: FROM,
      to: [params.clienteEmail],
      bcc: [BCC_DEFAULT, params.areaEmail].filter(Boolean),
      subject: `Nueva Cita ✅ — ${params.numeroDocumento}`,
      react: params.reactTemplate ?? undefined,
      text: `Registro de cita por ${params.clienteNombre}`,
    })
  }

  async sendLeadCorporativo(params: {
    areaEmail: string // SystemEmailService.getByArea("Corporativo")
    razonSocial: string
    ruc: string
    reactTemplate?: React.ReactElement
  }): Promise<SendEmailResult> {
    return this.send({
      from: FROM,
      to: [params.areaEmail],
      bcc: [BCC_DEFAULT],
      subject: `Lead Corporativo ✅ — ${params.ruc}`,
      react: params.reactTemplate ?? undefined,
      text: `Nuevo lead corporativo de ${params.razonSocial}`,
    })
  }

  async sendReclamo(params: {
    clienteEmail?: string
    clienteNombre: string
    numeroDocumento: string
    numeroReclamo: string
    areaEmail: string // SystemEmailService.getByArea("Reclamos")
    pdfBuffer: Buffer
    reactTemplate?: React.ReactElement
  }): Promise<SendEmailResult> {
    const bcc = [
      BCC_DEFAULT,
      params.areaEmail,
      params.clienteEmail ?? "",
    ].filter(Boolean)
    return this.send({
      from: FROM,
      to: [params.areaEmail], // principal al área Reclamos
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

export const emailService = new EmailService()
