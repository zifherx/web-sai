import { VehiculoResponseDTO } from "@/modules/vehiculo/application/dto/vehiculo.dto"
import { VehiculoMapper } from "@/modules/vehiculo/application/ports/vehiculo.mapper"
import { VehiculoNotFoundError } from "@/modules/vehiculo/domain/errors/VehiculoDomainError"
import { IVehiculoRepository } from "@/modules/vehiculo/domain/repositories/IVehiculoRepository"

export class DeleteVehiculoUseCase {
  constructor(private readonly repository: IVehiculoRepository) {}

  async execute(id: string): Promise<VehiculoResponseDTO> {
    const deleted = await this.repository.delete(id)
    if (!deleted) throw new VehiculoNotFoundError(id)
    return VehiculoMapper.toDTO(deleted)
  }
}
