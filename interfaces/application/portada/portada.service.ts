import {
  CreatePortadaDTO,
  PortadaMapper,
  PortadaResponseDTO,
  UpdatePortadaDTO,
} from "@/interfaces/application"
import {
  IPortadaRepository,
  PortadaAlreadyExistsError,
  PortadaNotFoundError,
  PortadaValidationError,
} from "@/interfaces/domain"

export class PortadaService {
  constructor(private readonly repository: IPortadaRepository) {}

  async getAll(
    filter?: Record<string, unknown>
  ): Promise<PortadaResponseDTO[]> {
    const portadas = await this.repository.findAll(filter)
    return PortadaMapper.toDTOList(portadas)
  }

  async getActive(): Promise<PortadaResponseDTO[]> {
    const portadas = await this.repository.findActive()
    return PortadaMapper.toDTOList(portadas)
  }

  async getById(id: string): Promise<PortadaResponseDTO> {
    if (!id) throw new PortadaValidationError("El id es requerido")
    const portada = await this.repository.findById(id)
    if (!portada) throw new PortadaNotFoundError(id)
    return PortadaMapper.toDTO(portada)
  }

  async create(
    dto: CreatePortadaDTO,
    userId: string
  ): Promise<PortadaResponseDTO> {
    const slug = dto.slug ?? this.generateSlug(dto.name)
    const existing = await this.repository.findBySlug(slug)
    if (existing) throw new PortadaAlreadyExistsError(slug)

    const created = await this.repository.create({
      name: dto.name,
      slug,
      imageUrl: dto.imageUrl,
      isActive: dto.isActive,
      createdBy: userId,
      isPublishable: () => dto.isActive && dto.imageUrl.length > 0,
    })
    return PortadaMapper.toDTO(created)
  }

  async update(id: string, dto: UpdatePortadaDTO): Promise<PortadaResponseDTO> {
    if (!id) throw new PortadaValidationError("El id es requerido")
    const updated = await this.repository.update(id, dto)
    if (!updated) throw new PortadaNotFoundError(id)
    return PortadaMapper.toDTO(updated)
  }

  async delete(id: string): Promise<PortadaResponseDTO> {
    if (!id) throw new PortadaValidationError("El id es requerido")
    const deleted = await this.repository.delete(id)
    if (!deleted) throw new PortadaNotFoundError(id)
    return PortadaMapper.toDTO(deleted)
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
