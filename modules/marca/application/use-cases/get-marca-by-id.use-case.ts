import { MarcaResponseDTO } from "@/modules/marca/application/dtos/marca.dto"
import { MarcaMapper } from "@/modules/marca/application/ports/marca.mapper"
import { MarcaNotFoundError } from "@/modules/marca/domain/errors/MarcaDomainError"
import { IMarcaRepository } from "@/modules/marca/domain/repositories/IMarcaRepository"

export class GetMarcaByIdUseCase {
  constructor(private readonly repository: IMarcaRepository) {}

  async execute(id: string): Promise<MarcaResponseDTO> {
    const item = await this.repository.findById(id)
    if (!item) throw new MarcaNotFoundError(id)
    return MarcaMapper.toDTO(item)
  }
}
