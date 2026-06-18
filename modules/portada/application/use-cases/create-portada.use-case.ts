import {
  CreatePortadaDTO,
  PortadaResponseDTO,
} from "@/modules/portada/application/dtos/portada.dto"
import { PortadaMapper } from "@/modules/portada/application/ports/portada.mapper"
import { PortadaEntity } from "@/modules/portada/domain/entities/Portada"
import { PortadaAlreadyExistsError } from "@/modules/portada/domain/errors/PortadaDomainError"
import { IPortadaRepository } from "@/modules/portada/domain/repositories/IPortadaRepository"

export class CreatePortadaUseCase {
  constructor(private readonly repository: IPortadaRepository) {}

  async execute(
    dto: CreatePortadaDTO,
    userId: string
  ): Promise<PortadaResponseDTO> {
    const slug = dto.slug ?? PortadaEntity.generateSlug(dto.name)

    const existing = await this.repository.findBySlug(slug)
    if (existing) throw new PortadaAlreadyExistsError(slug)

    const created = await this.repository.create({
      name: dto.name,
      slug,
      imageUrl: dto.imageUrl,
      isActive: dto.isActive,
      createdBy: userId,
    })

    return PortadaMapper.toDTO(created)
  }
}
