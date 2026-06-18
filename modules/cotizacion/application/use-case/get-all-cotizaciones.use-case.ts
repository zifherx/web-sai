import {
  CotizacionFiltersDTO,
  CotizacionResponseDTO,
} from "@/modules/cotizacion/application/dto/cotizacion.dto"
import { CotizacionMapper } from "@/modules/cotizacion/application/ports/cotizacion.mapper"
import {
  CotizacionFilters,
  ICotizacionRepository,
} from "@/modules/cotizacion/domain/repository/ICotizacionRepository"

export class GetAllCotizacionesUseCase {
  constructor(private readonly repository: ICotizacionRepository) {}

  async execute(
    filtersDTO?: CotizacionFiltersDTO
  ): Promise<CotizacionResponseDTO[]> {
    const filters = this.toFilters(filtersDTO)
    const items = await this.repository.findAll(filters)
    return CotizacionMapper.toDTOList(items)
  }

  private toFilters(dto?: CotizacionFiltersDTO): CotizacionFilters | undefined {
    if (!dto || Object.values(dto).every((v) => v === undefined))
      return undefined
    return {
      from: dto.from,
      to: dto.to,
      sedeId: dto.sedeId,
      intencionCompra: dto.intencionCompra,
    }
  }
}
