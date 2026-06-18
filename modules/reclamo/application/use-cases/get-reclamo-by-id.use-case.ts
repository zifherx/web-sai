import { ReclamoResponseDTO } from "@/modules/reclamo/application/dtos/reclamo.dto"
import { ReclamoMapper } from "@/modules/reclamo/application/ports/reclamo.mapper"
import { ReclamoNotFoundError } from "@/modules/reclamo/domain/errors/ReclamoDomainError"
import { IReclamoRepository } from "@/modules/reclamo/domain/repositories/IReclamoRepository"

export class GetReclamoByIdUseCase {
  constructor(private readonly repository: IReclamoRepository) {}

  async execute(id: string): Promise<ReclamoResponseDTO> {
    const item = await this.repository.findById(id)
    if (!item) throw new ReclamoNotFoundError(id)
    return ReclamoMapper.toDTO(item)
  }
}
