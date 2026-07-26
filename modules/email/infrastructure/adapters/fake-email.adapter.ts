import { IEmailPort } from "@/modules/email/domain/repository/IEmailRepository"
import {
  SendCitaEmailParams,
  SendEmailResult,
  SendLeadCorporativoEmailParams,
  SendReclamoEmailParams,
} from "@/modules/email/domain/types/EmailTypes"

export class FakeEmailAdapter implements IEmailPort {
  async sendCita(params: SendCitaEmailParams): Promise<SendEmailResult> {
    console.log("🧪 [FakeEmailAdapter.sendCita]", {
      to_esperado: params.areaEmail,
      bcc_esperado: params.clienteEmail,
      numeroDocumento: params.numeroDocumento,
      clienteNombre: params.clienteNombre,
    })
    return { success: true, id: "fake-id-test" }
  }

  async sendLeadCorporativo(
    params: SendLeadCorporativoEmailParams
  ): Promise<SendEmailResult> {
    return { success: true, id: "fake-id-test" }
  }

  async sendReclamo(params: SendReclamoEmailParams): Promise<SendEmailResult> {
    return { success: true, id: "fake-id-test" }
  }
}
