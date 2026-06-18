import { VehiculoResponseDTO } from "@/modules/vehiculo/application/dto/vehiculo.dto"
import { VehiculoMapper } from "@/modules/vehiculo/application/ports/vehiculo.mapper"
import { IVehiculoRepository } from "@/modules/vehiculo/domain/repositories/IVehiculoRepository"

/**
 * Caso de uso para listar todos los vehículos activos de una marca.
 * Usado en el frontend para la página de catálogo por marca (`/marcas/[slug]/vehiculos`).
 */
export class GetVehiculosByMarcaUseCase {
  constructor(private readonly repository: IVehiculoRepository) {}

  async execute(marcaId: string): Promise<VehiculoResponseDTO[]> {
    const items = await this.repository.findByMarca(marcaId)
    return VehiculoMapper.toDTOList(items)
  }
}
