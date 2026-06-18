import {
  LeadCorporativoFiltersDTO,
  LeadCorporativoResponseDTO,
} from "@/modules/lead-corporativo/application/dto/lead-corporativo.dto"
import { LeadCorporativoMapper } from "@/modules/lead-corporativo/application/mapper/lead-corporativo.mapper"
import {
  ILeadCorporativoRepository,
  LeadCorporativoFilters,
} from "@/modules/lead-corporativo/domain/repositories/ILeadCorporativoRepository"

export class GetAllLeadsCorporativosUseCase {
  constructor(private readonly repository: ILeadCorporativoRepository) {}

  async execute(
    filtersDTO?: LeadCorporativoFiltersDTO
  ): Promise<LeadCorporativoResponseDTO[]> {
    const filters = this.toFilters(filtersDTO)
    const items = await this.repository.findAll(filters)
    return LeadCorporativoMapper.toDTOList(items)
  }

  private toFilters(
    dto?: LeadCorporativoFiltersDTO
  ): LeadCorporativoFilters | undefined {
    if (!dto || Object.values(dto).every((v) => v === undefined))
      return undefined
    return {
      marcaId: dto.marcaId,
      ciudad: dto.ciudad,
      sector: dto.sector,
    }
  }
}
