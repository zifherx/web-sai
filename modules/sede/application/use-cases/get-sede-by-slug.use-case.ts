import type { SedeResponseDTO } from "@/modules/sede/application/dtos/sede.dto"
import { SedeMapper } from "@/modules/sede/application/ports/sede.mapper"
import { SedeNotFoundError } from "@/modules/sede/domain/errors/SedeDomainError"
import type { ISedeRepository } from "@/modules/sede/domain/repositories/ISedeRepository"

/**
 * Caso de uso para obtener una sede por slug público.
 *
 * Usado desde el frontend para las páginas de detalle de sede
 * (`/sedes/[slug]`) y desde el mapa Leaflet para cargar info de una sede.
 */
export class GetSedeBySlugUseCase {
  constructor(private readonly repository: ISedeRepository) {}

  async execute(slug: string): Promise<SedeResponseDTO> {
    const item = await this.repository.findBySlug(slug)
    if (!item) throw new SedeNotFoundError(slug)
    return SedeMapper.toDTO(item)
  }
}
