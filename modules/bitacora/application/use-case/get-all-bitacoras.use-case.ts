import {
  BitacoraFiltersDTO,
  BitacoraResponseItemDTO,
} from "@/modules/bitacora/application/dto/bitacora.dto"
import { BitacoraMapper } from "@/modules/bitacora/application/ports/bitacora.mapper"
import {
  BitacoraFilters,
  IBitacoraRepository,
} from "@/modules/bitacora/domain/repositories/IBitacoraRepository"

/**
 * Caso de uso para listar los registros de auditoría de llamadas a Novaly.
 * Solo CMS — datos internos de integración.
 *
 * Soporta filtros opcionales de rango de fechas y código de respuesta HTTP,
 * para facilitar la investigación de errores de integración.
 */
export class GetAllBitacorasUseCase {
  constructor(private readonly repository: IBitacoraRepository) {}

  async execute(
    filtersDTO?: BitacoraFiltersDTO
  ): Promise<BitacoraResponseItemDTO[]> {
    const filters = this.toFilters(filtersDTO)
    const items = await this.repository.findAll(filters)
    return BitacoraMapper.toDTOList(items)
  }

  private toFilters(dto?: BitacoraFiltersDTO): BitacoraFilters | undefined {
    if (!dto || Object.values(dto).every((v) => v === undefined))
      return undefined
    return {
      from: dto.from,
      to: dto.to,
      responseCode: dto.responseCode,
    }
  }
}
