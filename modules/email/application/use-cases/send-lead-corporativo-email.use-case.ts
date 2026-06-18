import {
  EmailResponseDTO,
  SendLeadCorporativoEmailDTO,
} from "@/modules/email/application/dto/email.dto"
import {
  EmailAreaNotConfiguredError,
  EmailSendError,
} from "@/modules/email/domain/errors/EmailDomainError"
import { IEmailPort } from "@/modules/email/domain/repository/IEmailRepository"
import { ISystemEmailRepository } from "@/modules/system-email/domain/repositories/ISystemEmailRepository"

/**
 * Caso de uso: Enviar email de notificación de lead corporativo al área.
 *
 * Resuelve el email del área "Corporativo" desde SystemEmail antes de enviar.
 * Lanza `EmailAreaNotConfiguredError` (422) si el área no está configurada.
 */
export class SendLeadCorporativoEmailUseCase {
  constructor(
    private readonly emailPort: IEmailPort,
    private readonly systemEmailRepository: ISystemEmailRepository
  ) {}

  async execute(dto: SendLeadCorporativoEmailDTO): Promise<EmailResponseDTO> {
    const systemEmail =
      await this.systemEmailRepository.findByArea("Corporativo")
    if (!systemEmail) throw new EmailAreaNotConfiguredError("Corporativo")

    const result = await this.emailPort.sendLeadCorporativo({
      areaEmail: systemEmail.email,
      razonSocial: dto.razonSocial,
      ruc: dto.ruc,
    })

    if (!result.success)
      throw new EmailSendError(result.error ?? "Error desconocido")

    return { id: result.id }
  }
}
