import {
  PortadaResponseDTO,
  UpdatePortadaDTO,
} from "@/modules/portada/application/dtos/portada.dto"
import { PortadaMapper } from "@/modules/portada/application/ports/portada.mapper"
import { PortadaNotFoundError } from "@/modules/portada/domain/errors/PortadaDomainError"
import { IPortadaRepository } from "@/modules/portada/domain/repositories/IPortadaRepository"

export class UpdatePortadaUseCase {
  constructor(private readonly repository: IPortadaRepository) {}

  async execute(
    id: string,
    dto: UpdatePortadaDTO
  ): Promise<PortadaResponseDTO> {
    const updated = await this.repository.update(id, dto)
    if (!updated) throw new PortadaNotFoundError(id)
    return PortadaMapper.toDTO(updated)
  }
}
