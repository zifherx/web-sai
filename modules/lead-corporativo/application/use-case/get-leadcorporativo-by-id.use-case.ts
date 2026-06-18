import { LeadCorporativoResponseDTO } from "@/modules/lead-corporativo/application/dto/lead-corporativo.dto"
import { LeadCorporativoMapper } from "@/modules/lead-corporativo/application/mapper/lead-corporativo.mapper"
import { LeadCorporativoNotFoundError } from "@/modules/lead-corporativo/domain/errors/LeadCorporativoDomainError"
import { ILeadCorporativoRepository } from "@/modules/lead-corporativo/domain/repositories/ILeadCorporativoRepository"

export class GetLeadCorporativoByIdUseCase {
  constructor(private readonly repository: ILeadCorporativoRepository) {}

  async execute(id: string): Promise<LeadCorporativoResponseDTO> {
    const item = await this.repository.findById(id)
    if (!item) throw new LeadCorporativoNotFoundError(id)
    return LeadCorporativoMapper.toDTO(item)
  }
}
