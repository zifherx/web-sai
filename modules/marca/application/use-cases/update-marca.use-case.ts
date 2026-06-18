import {
  MarcaResponseDTO,
  UpdateMarcaDTO,
} from "@/modules/marca/application/dtos/marca.dto"
import { MarcaMapper } from "@/modules/marca/application/ports/marca.mapper"
import { MarcaNotFoundError } from "@/modules/marca/domain/errors/MarcaDomainError"
import { IMarcaRepository } from "@/modules/marca/domain/repositories/IMarcaRepository"

export class UpdateMarcaUseCase {
  constructor(private readonly repository: IMarcaRepository) {}

  async execute(id: string, dto: UpdateMarcaDTO): Promise<MarcaResponseDTO> {
    const updated = await this.repository.update(id, dto)
    if (!updated) throw new MarcaNotFoundError(id)
    return MarcaMapper.toDTO(updated)
  }
}
