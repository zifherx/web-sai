import { MarcaResponseDTO } from "@/modules/marca/application/dtos/marca.dto"
import { MarcaMapper } from "@/modules/marca/application/ports/marca.mapper"
import { IMarcaRepository } from "@/modules/marca/domain/repositories/IMarcaRepository"

export class GetActiveMarcasUseCase {
  constructor(private readonly repository: IMarcaRepository) {}

  async execute(): Promise<MarcaResponseDTO[]> {
    const items = await this.repository.findActive()
    return MarcaMapper.toDTOList(items)
  }
}
