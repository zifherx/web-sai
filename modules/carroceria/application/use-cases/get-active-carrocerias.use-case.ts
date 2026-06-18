import { CarroceriaResponseDTO } from "@/modules/carroceria/application/dto/carroceria.dto"
import { CarroceriaMapper } from "@/modules/carroceria/application/ports/carroceria.mapper"
import { ICarroceriaRepository } from "@/modules/carroceria/domain/repository/ICarroceriaRepository"

export class GetActiveCarroceriasUseCase {
  constructor(private readonly repository: ICarroceriaRepository) {}

  async execute(): Promise<CarroceriaResponseDTO[]> {
    const items = await this.repository.findActive()
    return CarroceriaMapper.toDTOList(items)
  }
}
