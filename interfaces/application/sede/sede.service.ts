import {
  SedeAlreadyExistsError,
  SedeNotFoundError,
  SedeValidationError,
} from "@/interfaces/domain/sede/sede.errors"
import {
  ISedeRepository,
  SedeFilters,
} from "@/interfaces/domain/sede/sede.repository.port"
import {
  CreateSedeDTO,
  SedeFiltersDTO,
  SedeResponseDTO,
  UpdateSedeDTO,
} from "./sede.dto"
import { SedeMapper } from "./sede.mapper"

export class SedeService {
  constructor(private readonly repository: ISedeRepository) {}

  async getAll(filtersDTO?: SedeFiltersDTO): Promise<SedeResponseDTO[]> {
    const filters = this.mapFilters(filtersDTO)
    const sedes = await this.repository.findAll(filters)
    return SedeMapper.toDTOList(sedes)
  }

  async getActive(
    filtersDTO?: Omit<SedeFiltersDTO, "isActive">
  ): Promise<SedeResponseDTO[]> {
    const filters = this.mapFilters(filtersDTO)
    const sedes = await this.repository.findActive(filters)
    return SedeMapper.toDTOList(sedes)
  }

  async getById(id: string): Promise<SedeResponseDTO> {
    if (!id) throw new SedeValidationError("El id es requerido")
    const sede = await this.repository.findById(id)
    if (!sede) throw new SedeNotFoundError(id)
    return SedeMapper.toDTO(sede)
  }

  async getBySlug(slug: string): Promise<SedeResponseDTO> {
    if (!slug) throw new SedeValidationError("El slug es requerido")
    const sede = await this.repository.findBySlug(slug)
    if (!sede) throw new SedeNotFoundError(slug)
    return SedeMapper.toDTO(sede)
  }

  async getByCiudad(ciudad: string): Promise<SedeResponseDTO[]> {
    if (!ciudad) throw new SedeValidationError("La ciudad es requerida")
    const sedes = await this.repository.findByCiudad(ciudad)
    return SedeMapper.toDTOList(sedes)
  }

  async getTalleres(): Promise<SedeResponseDTO[]> {
    const sedes = await this.repository.findTalleres()
    return SedeMapper.toDTOList(sedes)
  }

  // ── Commands ─────────────────────────────────────────────────

  async create(dto: CreateSedeDTO, userId: string): Promise<SedeResponseDTO> {
    const existing = await this.repository.findBySlug(dto.slug)
    if (existing) throw new SedeAlreadyExistsError(dto.slug)

    const created = await this.repository.create({
      name: dto.name,
      slug: dto.slug,
      idTiendaNovaly: dto.idTiendaNovaly,
      codexHR: dto.codexHR,
      imageUrl: dto.imageUrl,
      ciudad: dto.ciudad,
      address: dto.address,
      scheduleRegular: dto.scheduleRegular,
      scheduleExtended: dto.scheduleExtended,
      linkHowArrived: dto.linkHowArrived,
      marcasDisponiblesVentas: dto.marcasDisponiblesVentas,
      marcasDisponiblesTaller: dto.marcasDisponiblesTaller,
      coordenadasMapa: dto.coordenadasMapa,
      celularCitas: dto.celularCitas,
      isTaller: dto.isTaller,
      isActive: dto.isActive,
      createdBy: userId,
    })

    return SedeMapper.toDTO(created)
  }

  async update(id: string, dto: UpdateSedeDTO): Promise<SedeResponseDTO> {
    if (!id) throw new SedeValidationError("El id es requerido")

    // Si cambia el slug, verificar unicidad
    if (dto.slug) {
      const existing = await this.repository.findBySlug(dto.slug)
      if (existing && existing.id !== id) {
        throw new SedeAlreadyExistsError(dto.slug)
      }
    }

    const updated = await this.repository.update(id, dto)
    if (!updated) throw new SedeNotFoundError(id)
    return SedeMapper.toDTO(updated)
  }

  async delete(id: string): Promise<SedeResponseDTO> {
    if (!id) throw new SedeValidationError("El id es requerido")
    const deleted = await this.repository.delete(id)
    if (!deleted) throw new SedeNotFoundError(id)
    return SedeMapper.toDTO(deleted)
  }

  // ── Helper privado ───────────────────────────────────────────

  private mapFilters(dto?: SedeFiltersDTO): SedeFilters | undefined {
    if (!dto) return undefined
    return {
      ciudad: dto.ciudad,
      isActive: dto.isActive,
      isTaller: dto.isTaller,
      marcaVentaId: dto.marcaVentaId,
      marcaTallerId: dto.marcaTallerId,
    }
  }
}
