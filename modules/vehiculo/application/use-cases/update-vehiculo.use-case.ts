import {
  UpdateVehiculoDTO,
  VehiculoResponseDTO,
} from "@/modules/vehiculo/application/dto/vehiculo.dto"
import { VehiculoMapper } from "@/modules/vehiculo/application/ports/vehiculo.mapper"
import {
  VehiculoAlreadyExistsError,
  VehiculoNotFoundError,
} from "@/modules/vehiculo/domain/errors/VehiculoDomainError"
import { IVehiculoRepository } from "@/modules/vehiculo/domain/repositories/IVehiculoRepository"

export class UpdateVehiculoUseCase {
  constructor(private readonly repository: IVehiculoRepository) {}

  async execute(
    id: string,
    dto: UpdateVehiculoDTO
  ): Promise<VehiculoResponseDTO> {
    // Si se actualiza el slug, verificar que no lo use otro vehículo
    if (dto.slug) {
      const existing = await this.repository.findBySlug(dto.slug)
      if (existing && existing.id !== id) {
        throw new VehiculoAlreadyExistsError(dto.slug)
      }
    }

    const updated = await this.repository.update(id, dto)
    if (!updated) throw new VehiculoNotFoundError(id)
    return VehiculoMapper.toDTO(updated)
  }
}
