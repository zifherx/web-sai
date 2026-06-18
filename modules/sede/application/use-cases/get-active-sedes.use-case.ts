import type {
  SedeFiltersDTO,
  SedeResponseDTO,
} from "@/modules/sede/application/dtos/sede.dto"
import { SedeMapper } from "@/modules/sede/application/ports/sede.mapper"
import type {
  ISedeRepository,
  SedeFilters,
} from "@/modules/sede/domain/repositories/ISedeRepository"

type ActiveFiltersDTO = Omit<SedeFiltersDTO, "isActive">

export class GetActiveSedesUseCase {
  constructor(private readonly repository: ISedeRepository) {}

  async execute(filtersDTO?: ActiveFiltersDTO): Promise<SedeResponseDTO[]> {
    const filters = this.toFilters(filtersDTO)
    const items = await this.repository.findActive(filters)
    return SedeMapper.toDTOList(items)
  }

  private toFilters(
    dto?: ActiveFiltersDTO
  ): Omit<SedeFilters, "isActive"> | undefined {
    if (!dto || Object.keys(dto).length === 0) return undefined
    return {
      ciudad: dto.ciudad,
      isTaller: dto.isTaller,
      marcaVentaId: dto.marcaVentaId,
      marcaTallerId: dto.marcaTallerId,
    }
  }
}
