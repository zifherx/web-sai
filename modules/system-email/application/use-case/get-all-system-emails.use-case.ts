import { SystemEmailResponseDTO } from "@/modules/system-email/application/dto/system-email.dto"
import { SystemEmailMapper } from "@/modules/system-email/application/ports/system-email.mapper"
import { ISystemEmailRepository } from "@/modules/system-email/domain/repositories/ISystemEmailRepository"

export class GetAllSystemEmailsUseCase {
  constructor(private readonly repository: ISystemEmailRepository) {}

  async execute(): Promise<SystemEmailResponseDTO[]> {
    const items = await this.repository.findAll()
    return SystemEmailMapper.toDTOList(items)
  }
}
