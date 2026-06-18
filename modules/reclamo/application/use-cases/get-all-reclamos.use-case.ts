import {
  ReclamoFiltersDTO,
  ReclamoResponseDTO,
} from "@/modules/reclamo/application/dtos/reclamo.dto"
import { ReclamoMapper } from "@/modules/reclamo/application/ports/reclamo.mapper"
import {
  IReclamoRepository,
  ReclamoFilters,
} from "@/modules/reclamo/domain/repositories/IReclamoRepository"

export class GetAllReclamosUseCase {
  constructor(private readonly repository: IReclamoRepository) {}

  async execute(filtersDTO?: ReclamoFiltersDTO): Promise<ReclamoResponseDTO[]> {
    const filters = this.toFilters(filtersDTO)
    const items = await this.repository.findAll(filters)
    return ReclamoMapper.toDTOList(items)
  }

  private toFilters(dto?: ReclamoFiltersDTO): ReclamoFilters | undefined {
    if (
      !dto ||
      Object.keys(dto).every((k) => dto[k as keyof typeof dto] === undefined)
    )
      return undefined
    return {
      tipoSolicitud: dto.tipoSolicitud,
      sedeCodexHR: dto.sedeCodexHR,
      fecha: dto.fecha,
    }
  }
}
