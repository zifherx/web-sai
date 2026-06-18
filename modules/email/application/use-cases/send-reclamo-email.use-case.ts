import {
  EmailResponseDTO,
  SendReclamoEmailDTO,
} from "@/modules/email/application/dto/email.dto"
import {
  EmailAreaNotConfiguredError,
  EmailSendError,
} from "@/modules/email/domain/errors/EmailDomainError"
import { IEmailPort } from "@/modules/email/domain/repository/IEmailRepository"
import { ISystemEmailRepository } from "@/modules/system-email/domain/repositories/ISystemEmailRepository"

/**
 * Caso de uso: Enviar email de reclamo con PDF adjunto.
 *
 * Resuelve el email del área "Reclamos" desde SystemEmail.
 * Convierte el `pdfBase64` del DTO en un `Buffer` para el adjunto.
 */
export class SendReclamoEmailUseCase {
  constructor(
    private readonly emailPort: IEmailPort,
    private readonly systemEmailRepository: ISystemEmailRepository
  ) {}

  async execute(dto: SendReclamoEmailDTO): Promise<EmailResponseDTO> {
    const systemEmail = await this.systemEmailRepository.findByArea("Reclamos")
    if (!systemEmail) throw new EmailAreaNotConfiguredError("Reclamos")

    const pdfBuffer = Buffer.from(dto.pdfBase64, "base64")

    const result = await this.emailPort.sendReclamo({
      clienteEmail: dto.email || undefined,
      clienteNombre: dto.nombres,
      numeroDocumento: dto.numeroDocumento,
      numeroReclamo: dto.numeroReclamo,
      areaEmail: systemEmail.email,
      pdfBuffer,
    })

    if (!result.success)
      throw new EmailSendError(result.error ?? "Error desconocido")

    return { id: result.id }
  }
}
