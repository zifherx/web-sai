import { CarroceriaResponseDTO } from "@/modules/carroceria/application/dto/carroceria.dto"
import { CarroceriaMapper } from "@/modules/carroceria/application/ports/carroceria.mapper"
import type { ICarroceriaRepository } from "@/modules/carroceria/domain/repository/ICarroceriaRepository"

export class GetAllCarroceriasUseCase {
  constructor(private readonly repository: ICarroceriaRepository) {}

  async execute(
    filter?: Record<string, unknown>
  ): Promise<CarroceriaResponseDTO[]> {
    const items = await this.repository.findAll(filter)
    return CarroceriaMapper.toDTOList(items)
  }
}
