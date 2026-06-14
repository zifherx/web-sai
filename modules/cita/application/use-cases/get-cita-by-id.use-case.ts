import { CitaResponseDTO } from "@/modules/cita/application/dto/cita.dto"
import { CitaMapper } from "@/modules/cita/application/ports/cita.mapper"
import { CitaNotFoundError } from "@/modules/cita/domain/errors/CitaDomainError"
import { ICitaRepository } from "@/modules/cita/domain/repository/ICitaRepository"

export class GetCitaByIdUseCase {
  constructor(private readonly repository: ICitaRepository) {}

  async execute(id: string): Promise<CitaResponseDTO> {
    const item = await this.repository.findById(id)
    if (!item) throw new CitaNotFoundError(id)
    return CitaMapper.toDTO(item)
  }
}
