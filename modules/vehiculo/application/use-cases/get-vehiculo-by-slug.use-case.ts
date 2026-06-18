import { VehiculoResponseDTO } from "@/modules/vehiculo/application/dto/vehiculo.dto"
import { VehiculoMapper } from "@/modules/vehiculo/application/ports/vehiculo.mapper"
import { VehiculoNotFoundError } from "@/modules/vehiculo/domain/errors/VehiculoDomainError"
import { IVehiculoRepository } from "@/modules/vehiculo/domain/repositories/IVehiculoRepository"

/**
 * Caso de uso para obtener un vehículo por slug público.
 * Usado desde las páginas de detalle del frontend (`/vehiculos/[slug]`).
 */
export class GetVehiculoBySlugUseCase {
  constructor(private readonly repository: IVehiculoRepository) {}

  async execute(slug: string): Promise<VehiculoResponseDTO> {
    const item = await this.repository.findBySlug(slug)
    if (!item) throw new VehiculoNotFoundError(slug)
    return VehiculoMapper.toDTO(item)
  }
}
