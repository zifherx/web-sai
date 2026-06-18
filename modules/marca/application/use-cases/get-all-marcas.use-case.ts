import { MarcaResponseDTO } from "@/modules/marca/application/dtos/marca.dto"
import { MarcaMapper } from "@/modules/marca/application/ports/marca.mapper"
import { IMarcaRepository } from "@/modules/marca/domain/repositories/IMarcaRepository"

export class GetAllMarcasUseCase {
  constructor(private readonly repository: IMarcaRepository) {}

  async execute(filter?: Record<string, unknown>): Promise<MarcaResponseDTO[]> {
    const items = await this.repository.findAll(filter)
    return MarcaMapper.toDTOList(items)
  }
}
