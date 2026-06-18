import type { IMarcaRepository } from "@/modules/marca/domain/repositories/IMarcaRepository"
import type { SedeResponseDTO } from "@/modules/sede/application/dtos/sede.dto"
import { SedeMapper } from "@/modules/sede/application/ports/sede.mapper"
import { SedeEntity } from "@/modules/sede/domain/entities/Sede"
import type { ISedeRepository } from "@/modules/sede/domain/repositories/ISedeRepository"

/**
 * Caso de uso para obtener las sedes de ventas disponibles para una marca.
 *
 * Requiere dos repositorios:
 * - `marcaRepository` para resolver el nombre/slug → ID de marca
 * - `sedeRepository` para consultar las sedes por ese ID
 *
 * Si la marca no existe, retorna lista vacía (comportamiento original preservado):
 * el frontend maneja "sin sedes" sin necesidad de un error 404 de marca.
 */
export class GetSedesByMarcaUseCase {
  constructor(
    private readonly sedeRepository: ISedeRepository,
    private readonly marcaRepository: IMarcaRepository
  ) {}

  async execute(marcaNombre: string): Promise<SedeResponseDTO[]> {
    const slug = SedeEntity.generateSlug(marcaNombre)
    const marca = await this.marcaRepository.findBySlug(slug)

    // Marca no encontrada → retorno vacío intencional
    if (!marca) return []

    const items = await this.sedeRepository.findByMarcaVentas(marca.id)
    return SedeMapper.toDTOList(items)
  }
}
