import { PortadaResponseDTO } from "@/modules/portada/application/dtos/portada.dto"
import { PortadaMapper } from "@/modules/portada/application/ports/portada.mapper"
import { PortadaNotFoundError } from "@/modules/portada/domain/errors/PortadaDomainError"
import { IPortadaRepository } from "@/modules/portada/domain/repositories/IPortadaRepository"

export class DeletePortadaUseCase {
  constructor(private readonly repository: IPortadaRepository) {}

  async execute(id: string): Promise<PortadaResponseDTO> {
    const deleted = await this.repository.delete(id)
    if (!deleted) throw new PortadaNotFoundError(id)
    return PortadaMapper.toDTO(deleted)
  }
}
