import type {
  SedeResponseDTO,
  UpdateSedeDTO,
} from "@/modules/sede/application/dtos/sede.dto"
import { SedeMapper } from "@/modules/sede/application/ports/sede.mapper"
import {
  SedeAlreadyExistsError,
  SedeNotFoundError,
} from "@/modules/sede/domain/errors/SedeDomainError"
import type { ISedeRepository } from "@/modules/sede/domain/repositories/ISedeRepository"

export class UpdateSedeUseCase {
  constructor(private readonly repository: ISedeRepository) {}

  async execute(id: string, dto: UpdateSedeDTO): Promise<SedeResponseDTO> {
    // Si se actualiza el slug, verificar que no lo use otra sede
    if (dto.slug) {
      const existing = await this.repository.findBySlug(dto.slug)
      if (existing && existing.id !== id) {
        throw new SedeAlreadyExistsError(dto.slug)
      }
    }

    const updated = await this.repository.update(id, dto)
    if (!updated) throw new SedeNotFoundError(id)
    return SedeMapper.toDTO(updated)
  }
}
