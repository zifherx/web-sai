import { SystemEmailResponseDTO } from "@/modules/system-email/application/dto/system-email.dto"
import { SystemEmailMapper } from "@/modules/system-email/application/ports/system-email.mapper"
import { SystemEmailNotFoundError } from "@/modules/system-email/domain/errors/SystemEmailDomainError"
import { ISystemEmailRepository } from "@/modules/system-email/domain/repositories/ISystemEmailRepository"

export class GetSystemEmailByIdUseCase {
  constructor(private readonly repository: ISystemEmailRepository) {}

  async execute(id: string): Promise<SystemEmailResponseDTO> {
    const item = await this.repository.findById(id)
    if (!item) throw new SystemEmailNotFoundError(id)
    return SystemEmailMapper.toDTO(item)
  }
}
