import type {
  CarroceriaResponseDTO,
  UpdateCarroceriaDTO,
} from "@/modules/carroceria/application/dto/carroceria.dto"
import { CarroceriaMapper } from "@/modules/carroceria/application/ports/carroceria.mapper"
import { CarroceriaNotFoundError } from "@/modules/carroceria/domain/errors/CarroceriaDomainError"
import type { ICarroceriaRepository } from "@/modules/carroceria/domain/repository/ICarroceriaRepository"

export class UpdateCarroceriaUseCase {
  constructor(private readonly repository: ICarroceriaRepository) {}

  async execute(
    id: string,
    dto: UpdateCarroceriaDTO
  ): Promise<CarroceriaResponseDTO> {
    const updated = await this.repository.update(id, dto)
    if (!updated) throw new CarroceriaNotFoundError(id)
    return CarroceriaMapper.toDTO(updated)
  }
}
