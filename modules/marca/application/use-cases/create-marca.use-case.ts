import {
  CreateMarcaDTO,
  MarcaResponseDTO,
} from "@/modules/marca/application/dtos/marca.dto"
import { MarcaMapper } from "@/modules/marca/application/ports/marca.mapper"
import { MarcaEntity } from "@/modules/marca/domain/entities/Marca"
import { MarcaAlreadyExistsError } from "@/modules/marca/domain/errors/MarcaDomainError"
import { IMarcaRepository } from "@/modules/marca/domain/repositories/IMarcaRepository"

export class CreateMarcaUseCase {
  constructor(private readonly repository: IMarcaRepository) {}

  async execute(
    dto: CreateMarcaDTO,
    userId: string
  ): Promise<MarcaResponseDTO> {
    const slug = dto.slug ?? MarcaEntity.generateSlug(dto.name)

    const existing = await this.repository.findBySlug(slug)
    if (existing) throw new MarcaAlreadyExistsError(slug)

    const created = await this.repository.create({
      name: dto.name,
      slug,
      imageUrl: dto.imageUrl,
      idNovaly: dto.idNovaly,
      isActive: dto.isActive,
      createdBy: userId,
    })

    return MarcaMapper.toDTO(created)
  }
}
