import {
  VehiculoFiltersDTO,
  VehiculoResponseDTO,
} from "@/modules/vehiculo/application/dto/vehiculo.dto"
import { VehiculoMapper } from "@/modules/vehiculo/application/ports/vehiculo.mapper"
import {
  IVehiculoRepository,
  VehiculoFilters,
} from "@/modules/vehiculo/domain/repositories/IVehiculoRepository"

type ActiveFiltersDTO = Omit<VehiculoFiltersDTO, "isActive">

export class GetActiveVehiculosUseCase {
  constructor(private readonly repository: IVehiculoRepository) {}

  async execute(filtersDTO?: ActiveFiltersDTO): Promise<VehiculoResponseDTO[]> {
    const filters = this.toFilters(filtersDTO)
    const items = await this.repository.findActive(filters)
    return VehiculoMapper.toDTOList(items)
  }

  private toFilters(
    dto?: ActiveFiltersDTO
  ): Omit<VehiculoFilters, "isActive"> | undefined {
    if (!dto || Object.values(dto).every((v) => v === undefined))
      return undefined
    return {
      marcaId: dto.marcaId,
      carroceriaId: dto.carroceriaId,
      isNuevo: dto.isNuevo,
      isGLP: dto.isGLP,
      isLiquidacion: dto.isLiquidacion,
      isEntrega48H: dto.isEntrega48H,
      precioMin: dto.precioMin,
      precioMax: dto.precioMax,
      slug: dto.slug,
    }
  }
}
