import { MarcaResponseDTO } from "@/modules/marca/application/dtos/marca.dto"
import { MarcaMapper } from "@/modules/marca/application/ports/marca.mapper"
import { MarcaNotFoundError } from "@/modules/marca/domain/errors/MarcaDomainError"
import { IMarcaRepository } from "@/modules/marca/domain/repositories/IMarcaRepository"

export class DeleteMarcaUseCase {
  constructor(private readonly repository: IMarcaRepository) {}

  async execute(id: string): Promise<MarcaResponseDTO> {
    const deleted = await this.repository.delete(id)
    if (!deleted) throw new MarcaNotFoundError(id)
    return MarcaMapper.toDTO(deleted)
  }
}
