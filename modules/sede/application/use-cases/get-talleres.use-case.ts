import type { SedeResponseDTO } from "@/modules/sede/application/dtos/sede.dto"
import { SedeMapper } from "@/modules/sede/application/ports/sede.mapper"
import type { ISedeRepository } from "@/modules/sede/domain/repositories/ISedeRepository"

/**
 * Caso de uso para listar todas las sedes que operan como taller.
 * Usado en el frontend para el buscador de talleres de servicio.
 */
export class GetTalleresUseCase {
  constructor(private readonly repository: ISedeRepository) {}

  async execute(): Promise<SedeResponseDTO[]> {
    const items = await this.repository.findTalleres()
    return SedeMapper.toDTOList(items)
  }
}
