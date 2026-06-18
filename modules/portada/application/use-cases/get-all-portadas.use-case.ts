import { PortadaResponseDTO } from "@/modules/portada/application/dtos/portada.dto"
import { PortadaMapper } from "@/modules/portada/application/ports/portada.mapper"
import { IPortadaRepository } from "@/modules/portada/domain/repositories/IPortadaRepository"

export class GetAllPortadasUseCase {
  constructor(private readonly repository: IPortadaRepository) {}

  async execute(
    filter?: Record<string, unknown>
  ): Promise<PortadaResponseDTO[]> {
    const items = await this.repository.findAll(filter)
    return PortadaMapper.toDTOList(items)
  }
}
