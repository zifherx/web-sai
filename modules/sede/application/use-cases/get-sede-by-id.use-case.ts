import { SedeResponseDTO } from "@/modules/sede/application/dtos/sede.dto"
import { SedeMapper } from "@/modules/sede/application/ports/sede.mapper"
import { SedeNotFoundError } from "@/modules/sede/domain/errors/SedeDomainError"
import { ISedeRepository } from "@/modules/sede/domain/repositories/ISedeRepository"

export class GetSedeByIdUseCase {
  constructor(private readonly repository: ISedeRepository) {}

  async execute(id: string): Promise<SedeResponseDTO> {
    const item = await this.repository.findById(id)
    if (!item) throw new SedeNotFoundError(id)
    return SedeMapper.toDTO(item)
  }
}
