import type { SedeResponseDTO } from "@/modules/sede/application/dtos/sede.dto"
import { SedeMapper } from "@/modules/sede/application/ports/sede.mapper"
import { SedeNotFoundError } from "@/modules/sede/domain/errors/SedeDomainError"
import type { ISedeRepository } from "@/modules/sede/domain/repositories/ISedeRepository"

export class DeleteSedeUseCase {
  constructor(private readonly repository: ISedeRepository) {}

  async execute(id: string): Promise<SedeResponseDTO> {
    const deleted = await this.repository.delete(id)
    if (!deleted) throw new SedeNotFoundError(id)
    return SedeMapper.toDTO(deleted)
  }
}
