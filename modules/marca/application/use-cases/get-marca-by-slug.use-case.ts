import { MarcaResponseDTO } from "@/modules/marca/application/dtos/marca.dto"
import { MarcaMapper } from "@/modules/marca/application/ports/marca.mapper"
import { MarcaNotFoundError } from "@/modules/marca/domain/errors/MarcaDomainError"
import { IMarcaRepository } from "@/modules/marca/domain/repositories/IMarcaRepository"

export class GetMarcaBySlugUseCase {
  constructor(private readonly repository: IMarcaRepository) {}

  async execute(slug: string): Promise<MarcaResponseDTO> {
    const item = await this.repository.findBySlug(slug)
    if (!item) throw new MarcaNotFoundError(slug)
    return MarcaMapper.toDTO(item)
  }
}
