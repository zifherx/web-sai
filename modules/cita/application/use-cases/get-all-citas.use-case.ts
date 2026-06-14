import {
  CitaFiltersDTO,
  CitaResponseDTO,
} from "@/modules/cita/application/dto/cita.dto"
import { CitaMapper } from "@/modules/cita/application/ports/cita.mapper"
import {
  CitaFilters,
  ICitaRepository,
} from "@/modules/cita/domain/repository/ICitaRepository"

export class GetAllCitasUseCase {
  constructor(private readonly repository: ICitaRepository) {}

  async execute(filtersDTO?: CitaFiltersDTO): Promise<CitaResponseDTO[]> {
    const filters = this.toFilters(filtersDTO)
    const items = await this.repository.findAll(filters)
    return CitaMapper.toDTOList(items)
  }

  private toFilters(dto?: CitaFiltersDTO): CitaFilters | undefined {
    if (!dto || Object.values(dto).every((v) => v === undefined))
      return undefined
    return {
      sedeId: dto.sedeId,
      tipoServicio: dto.tipoServicio,
      from: dto.from,
      to: dto.to,
    }
  }
}
