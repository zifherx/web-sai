import type { CarroceriaResponseDTO } from "@/modules/carroceria/application/dto/carroceria.dto"
import { CarroceriaMapper } from "@/modules/carroceria/application/ports/carroceria.mapper"
import { CarroceriaNotFoundError } from "@/modules/carroceria/domain/errors/CarroceriaDomainError"
import type { ICarroceriaRepository } from "@/modules/carroceria/domain/repository/ICarroceriaRepository"

export class DeleteCarroceriaUseCase {
  constructor(private readonly repository: ICarroceriaRepository) {}

  async execute(id: string): Promise<CarroceriaResponseDTO> {
    const deleted = await this.repository.delete(id)
    if (!deleted) throw new CarroceriaNotFoundError(id)
    return CarroceriaMapper.toDTO(deleted)
  }
}
