import {
  VehiculoFiltersDTO,
  VehiculoResponseDTO,
} from "@/modules/vehiculo/application/dto/vehiculo.dto"
import { VehiculoMapper } from "@/modules/vehiculo/application/ports/vehiculo.mapper"
import {
  IVehiculoRepository,
  VehiculoFilters,
} from "@/modules/vehiculo/domain/repositories/IVehiculoRepository"

export class GetAllVehiculosUseCase {
  constructor(private readonly repository: IVehiculoRepository) {}

  async execute(
    filtersDTO?: VehiculoFiltersDTO
  ): Promise<VehiculoResponseDTO[]> {
    const filters = this.toFilters(filtersDTO)
    const items = await this.repository.findAll(filters)
    return VehiculoMapper.toDTOList(items)
  }

  private toFilters(dto?: VehiculoFiltersDTO): VehiculoFilters | undefined {
    if (!dto || Object.values(dto).every((v) => v === undefined))
      return undefined
    return {
      marcaId: dto.marcaId,
      carroceriaId: dto.carroceriaId,
      isActive: dto.isActive,
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
