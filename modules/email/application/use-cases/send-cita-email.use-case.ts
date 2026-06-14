import {
  EmailResponseDTO,
  SendCitaEmailDTO,
} from "@/modules/email/application/dto/email.dto"
import {
  EmailAreaNotConfiguredError,
  EmailSendError,
} from "@/modules/email/domain/errors/EmailDomainError"
import { IEmailPort } from "@/modules/email/domain/repository/IEmailRepository"
import { ISystemEmailRepository } from "@/modules/system-email/domain/repositories/ISystemEmailRepository"

/**
 * Caso de uso: Enviar email de confirmación de cita al cliente y al área.
 *
 * Resuelve el email del área "Citas" desde SystemEmail antes de enviar.
 * Lanza `EmailAreaNotConfiguredError` (422) si el área no está configurada.
 */
export class SendCitaEmailUseCase {
  constructor(
    private readonly emailPort: IEmailPort,
    private readonly systemEmailRepository: ISystemEmailRepository
  ) {}

  async execute(dto: SendCitaEmailDTO): Promise<EmailResponseDTO> {
    const systemEmail = await this.systemEmailRepository.findByArea("Citas")
    if (!systemEmail) throw new EmailAreaNotConfiguredError("Citas")

    const result = await this.emailPort.sendCita({
      clienteEmail: dto.email,
      clienteNombre: dto.nombres,
      numeroDocumento: dto.numeroDocumento,
      areaEmail: systemEmail.email,
    })

    if (!result.success)
      throw new EmailSendError(result.error ?? "Error desconocido")

    return { id: result.id }
  }
}
