import { PortadaResponseDTO } from "@/modules/portada/application/dtos/portada.dto"
import { PortadaMapper } from "@/modules/portada/application/ports/portada.mapper"
import { PortadaNotFoundError } from "@/modules/portada/domain/errors/PortadaDomainError"
import { IPortadaRepository } from "@/modules/portada/domain/repositories/IPortadaRepository"

export class GetPortadaByIdUseCase {
  constructor(private readonly repository: IPortadaRepository) {}

  async execute(id: string): Promise<PortadaResponseDTO> {
    const item = await this.repository.findById(id)
    if (!item) throw new PortadaNotFoundError(id)
    return PortadaMapper.toDTO(item)
  }
}
