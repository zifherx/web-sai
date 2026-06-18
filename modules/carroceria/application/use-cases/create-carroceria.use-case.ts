import {
  CarroceriaResponseDTO,
  CreateCarroceriaDTO,
} from "@/modules/carroceria/application/dto/carroceria.dto"
import { CarroceriaMapper } from "@/modules/carroceria/application/ports/carroceria.mapper"
import { CarroceriaEntity } from "@/modules/carroceria/domain/entities/Carroceria"
import { CarroceriaAlreadyExistsError } from "@/modules/carroceria/domain/errors/CarroceriaDomainError"
import { ICarroceriaRepository } from "@/modules/carroceria/domain/repository/ICarroceriaRepository"

export class CreateCarroceriaUseCase {
  constructor(private readonly repository: ICarroceriaRepository) {}

  async execute(
    dto: CreateCarroceriaDTO,
    userId: string
  ): Promise<CarroceriaResponseDTO> {
    const slug = dto.slug ?? CarroceriaEntity.generateSlug(dto.name)

    const existing = await this.repository.findBySlug(slug)
    if (existing) throw new CarroceriaAlreadyExistsError(slug)

    const created = await this.repository.create({
      name: dto.name,
      slug,
      isActive: dto.isActive,
      createdBy: userId,
    })
    return CarroceriaMapper.toDTO(created)
  }
}
