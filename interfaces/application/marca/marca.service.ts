import {
  MarcaAlreadyExistsError,
  MarcaNotFoundError,
  ValidationError,
} from "@/interfaces/domain/marca/marca.errors"
import { IMarcaRepository } from "@/interfaces/domain/marca/marca.repository.port"
import { CreateMarcaDTO, MarcaResponseDTO, UpdateMarcaDTO } from "./marca.dto"
import { MarcaMapper } from "./marca.mapper"

export class MarcaService {
  constructor(private readonly repository: IMarcaRepository) {}

  async getAll(filter?: Record<string, unknown>): Promise<MarcaResponseDTO[]> {
    const items = await this.repository.findAll(filter)
    return MarcaMapper.toDTOList(items)
  }

  async getActive(): Promise<MarcaResponseDTO[]> {
    const items = await this.repository.findActive()
    return MarcaMapper.toDTOList(items)
  }

  async getById(id: string): Promise<MarcaResponseDTO> {
    if (!id) throw new ValidationError("El id es requerido")
    const item = await this.repository.findById(id)
    if (!item) throw new MarcaNotFoundError(id)
    return MarcaMapper.toDTO(item)
  }

  async getBySlug(slug: string): Promise<MarcaResponseDTO> {
    if (!slug) throw new ValidationError("El slug es requerido")
    const item = await this.repository.findBySlug(slug)
    if (!item) throw new MarcaNotFoundError(slug)
    return MarcaMapper.toDTO(item)
  }

  async create(dto: CreateMarcaDTO, userId: string): Promise<MarcaResponseDTO> {
    const slug = dto.slug ?? this.generateSlug(dto.name)
    const existing = await this.repository.findBySlug(slug)
    if (existing) throw new MarcaAlreadyExistsError(slug)

    const created = await this.repository.create({
      name: dto.name,
      slug,
      imageUrl: dto.imageUrl,
      idNovaly: dto.idNovaly,
      isActive: dto.isActive,
      createdBy: userId,
      isPublishable: () => dto.isActive && dto.imageUrl.length > 0,
    })
    return MarcaMapper.toDTO(created)
  }

  async update(id: string, dto: UpdateMarcaDTO): Promise<MarcaResponseDTO> {
    if (!id) throw new ValidationError("El id es requerido")
    const updated = await this.repository.update(id, dto)
    if (!updated) throw new MarcaNotFoundError(id)
    return MarcaMapper.toDTO(updated)
  }

  async delete(id: string): Promise<MarcaResponseDTO> {
    if (!id) throw new ValidationError("El id es requerido")
    const deleted = await this.repository.delete(id)
    if (!deleted) throw new MarcaNotFoundError(id)
    return MarcaMapper.toDTO(deleted)
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
  }
}
