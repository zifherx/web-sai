import {
  CreateSystemEmailDTO,
  SystemEmailResponseDTO,
} from "@/modules/system-email/application/dto/system-email.dto"
import { SystemEmailMapper } from "@/modules/system-email/application/ports/system-email.mapper"
import { ISystemEmailRepository } from "@/modules/system-email/domain/repositories/ISystemEmailRepository"

export class CreateSystemEmailUseCase {
  constructor(private readonly repository: ISystemEmailRepository) {}

  async execute(
    dto: CreateSystemEmailDTO,
    userId: string
  ): Promise<SystemEmailResponseDTO> {
    const created = await this.repository.create({
      area: dto.area,
      email: dto.email,
      isActive: dto.isActive,
      createdBy: userId,
    })

    return SystemEmailMapper.toDTO(created)
  }
}
