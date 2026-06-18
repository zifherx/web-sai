import { PortadaResponseDTO } from "@/modules/portada/application/dtos/portada.dto"
import { PortadaMapper } from "@/modules/portada/application/ports/portada.mapper"
import { IPortadaRepository } from "@/modules/portada/domain/repositories/IPortadaRepository"

export class GetActivePortadasUseCase {
  constructor(private readonly repository: IPortadaRepository) {}

  async execute(): Promise<PortadaResponseDTO[]> {
    const items = await this.repository.findActive()
    return PortadaMapper.toDTOList(items)
  }
}
