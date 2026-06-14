import { VehiculoResponseDTO } from "@/modules/vehiculo/application/dto/vehiculo.dto"
import { VehiculoMapper } from "@/modules/vehiculo/application/ports/vehiculo.mapper"
import { VehiculoNotFoundError } from "@/modules/vehiculo/domain/errors/VehiculoDomainError"
import { IVehiculoRepository } from "@/modules/vehiculo/domain/repositories/IVehiculoRepository"

export class GetVehiculoByIdUseCase {
  constructor(private readonly repository: IVehiculoRepository) {}

  async execute(id: string): Promise<VehiculoResponseDTO> {
    const item = await this.repository.findById(id)
    if (!item) throw new VehiculoNotFoundError(id)
    return VehiculoMapper.toDTO(item)
  }
}
