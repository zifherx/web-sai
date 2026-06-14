import { CarroceriaResponseDTO } from "@/modules/carroceria/application/dto/carroceria.dto"
import { CarroceriaMapper } from "@/modules/carroceria/application/ports/carroceria.mapper"
import {
  CarroceriaNotFoundError,
  CarroceriaValidationError,
} from "@/modules/carroceria/domain/errors/CarroceriaDomainError"
import { ICarroceriaRepository } from "@/modules/carroceria/domain/repository/ICarroceriaRepository"

export class GetCarroceriaByIdUseCase {
  constructor(private readonly repository: ICarroceriaRepository) {}

  async execute(id: string): Promise<CarroceriaResponseDTO> {
    if (!id) throw new CarroceriaValidationError("El id es requerido")
    const item = await this.repository.findById(id)
    if (!item) throw new CarroceriaNotFoundError(id)
    return CarroceriaMapper.toDTO(item)
  }
}
