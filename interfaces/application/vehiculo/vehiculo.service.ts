import {
  VehiculoAlreadyExistsError,
  VehiculoNotFoundError,
  VehiculoValidationError,
} from "@/interfaces/domain/vehiculo/vehiculo.errors"
import {
  IVehiculoRepository,
  VehiculoFilters,
} from "@/interfaces/domain/vehiculo/vehiculo.repository.port"
import {
  CreateVehiculoDTO,
  UpdateVehiculoDTO,
  VehiculoFiltersDTO,
  VehiculoResponseDTO,
} from "./vehiculo.dto"
import { VehiculoMapper } from "./vehiculo.mapper"

export class VehiculoService {
  constructor(private readonly repository: IVehiculoRepository) {}

  async getAll(
    filtersDTO?: VehiculoFiltersDTO
  ): Promise<VehiculoResponseDTO[]> {
    const filters = this.mapFilters(filtersDTO)
    const items = await this.repository.findAll(filters)
    return VehiculoMapper.toDTOList(items)
  }

  async getActive(
    filtersDTO?: Omit<VehiculoFiltersDTO, "isActive">
  ): Promise<VehiculoResponseDTO[]> {
    const filters = this.mapFilters(filtersDTO)
    const items = await this.repository.findActive(filters)
    return VehiculoMapper.toDTOList(items)
  }

  async getById(id: string): Promise<VehiculoResponseDTO> {
    if (!id) throw new VehiculoValidationError("El id es requerido")
    const item = await this.repository.findById(id)
    if (!item) throw new VehiculoNotFoundError(id)
    return VehiculoMapper.toDTO(item)
  }

  async getBySlug(slug: string): Promise<VehiculoResponseDTO> {
    if (!slug) throw new VehiculoValidationError("El slug es requerido")
    const item = await this.repository.findBySlug(slug)
    if (!item) throw new VehiculoNotFoundError(slug)
    return VehiculoMapper.toDTO(item)
  }

  async getByMarca(marcaId: string): Promise<VehiculoResponseDTO[]> {
    if (!marcaId) throw new VehiculoValidationError("El marcaId es requerido")
    const items = await this.repository.findByMarca(marcaId)
    return VehiculoMapper.toDTOList(items)
  }

  // ── Commands ─────────────────────────────────────────────────

  async create(
    dto: CreateVehiculoDTO,
    userId: string
  ): Promise<VehiculoResponseDTO> {
    // Verificar unicidad del slug
    const existing = await this.repository.findBySlug(dto.slug)
    if (existing) throw new VehiculoAlreadyExistsError(dto.slug)

    const created = await this.repository.create({
      name: dto.name,
      slug: dto.slug,
      codigoFlashdealer: dto.codigoFlashdealer,
      imageUrl: dto.imageUrl,
      precioBase: dto.precioBase,
      fichaTecnica: dto.fichaTecnica,
      marcaId: dto.marcaId,
      carroceriaId: dto.carroceriaId,
      isEntrega48H: dto.isEntrega48H,
      isGLP: dto.isGLP,
      isLiquidacion: dto.isLiquidacion,
      isNuevo: dto.isNuevo,
      isActive: dto.isActive,
      colores: dto.colores,
      features: dto.features,
      galeria: dto.galeria,
      createdBy: userId,
    })

    return VehiculoMapper.toDTO(created)
  }

  async update(
    id: string,
    dto: UpdateVehiculoDTO
  ): Promise<VehiculoResponseDTO> {
    if (!id) throw new VehiculoValidationError("El id es requerido")

    // Si cambia el slug, verificar que no exista otro con ese slug
    if (dto.slug) {
      const existing = await this.repository.findBySlug(dto.slug)
      if (existing && existing.id !== id) {
        throw new VehiculoAlreadyExistsError(dto.slug)
      }
    }

    const updated = await this.repository.update(id, dto)
    if (!updated) throw new VehiculoNotFoundError(id)
    return VehiculoMapper.toDTO(updated)
  }

  async delete(id: string): Promise<VehiculoResponseDTO> {
    if (!id) throw new VehiculoValidationError("El id es requerido")
    const deleted = await this.repository.delete(id)
    if (!deleted) throw new VehiculoNotFoundError(id)
    return VehiculoMapper.toDTO(deleted)
  }

  private mapFilters(dto?: VehiculoFiltersDTO): VehiculoFilters | undefined {
    if (!dto) return undefined
    return {
      marcaId: dto.marcaId,
      carroceriaId: dto.carroceriaId,
      isActive: dto.isActive,
      isNuevo: dto.isNuevo,
      isGLP: dto.isGLP,
      isLiquidacion: dto.isLiquidacion,
      isEntrega48H: dto.isEntrega48H,
      precioMin: dto.precioMin,
      precioMax: dto.precioMax,
      slug: dto.slug,
    }
  }
}
