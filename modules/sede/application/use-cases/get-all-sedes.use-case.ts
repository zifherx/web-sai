import type {
  SedeFiltersDTO,
  SedeResponseDTO,
} from "@/modules/sede/application/dtos/sede.dto"
import { SedeMapper } from "@/modules/sede/application/ports/sede.mapper"
import type {
  ISedeRepository,
  SedeFilters,
} from "@/modules/sede/domain/repositories/ISedeRepository"

export class GetAllSedesUseCase {
  constructor(private readonly repository: ISedeRepository) {}

  async execute(filtersDTO?: SedeFiltersDTO): Promise<SedeResponseDTO[]> {
    const filters = this.toFilters(filtersDTO)
    const items = await this.repository.findAll(filters)
    return SedeMapper.toDTOList(items)
  }

  private toFilters(dto?: SedeFiltersDTO): SedeFilters | undefined {
    if (!dto || Object.keys(dto).length === 0) return undefined
    return {
      ciudad: dto.ciudad,
      isActive: dto.isActive,
      isTaller: dto.isTaller,
      marcaVentaId: dto.marcaVentaId,
      marcaTallerId: dto.marcaTallerId,
    }
  }
}
