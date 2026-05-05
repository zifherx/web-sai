import {
  CarroceriaMapper,
  CarroceriaResponseDTO,
  CreateCarroceriaDTO,
  UpdateCarroceriaDTO,
} from "@/interfaces/application"
import {
  CarroceriaAlreadyExistsError,
  CarroceriaNotFoundError,
  ICarroceriaRepository,
  ValidationError,
} from "@/interfaces/domain"

export class CarroceriaService {
  constructor(private readonly repository: ICarroceriaRepository) {}

  async getAll(
    filter?: Record<string, unknown>
  ): Promise<CarroceriaResponseDTO[]> {
    const items = await this.repository.findAll(filter)
    return CarroceriaMapper.toDTOList(items)
  }

  async getActive(): Promise<CarroceriaResponseDTO[]> {
    const items = await this.repository.findActive()
    return CarroceriaMapper.toDTOList(items)
  }

  async getById(id: string): Promise<CarroceriaResponseDTO> {
    if (!id) throw new ValidationError("El id es requerido")
    const item = await this.repository.findById(id)
    if (!item) throw new CarroceriaNotFoundError(id)
    return CarroceriaMapper.toDTO(item)
  }

  async create(
    dto: CreateCarroceriaDTO,
    userId: string
  ): Promise<CarroceriaResponseDTO> {
    const slug = dto.slug ?? this.generateSlug(dto.name)
    const existing = await this.repository.findBySlug(slug)
    if (existing) throw new CarroceriaAlreadyExistsError(slug)

    const created = await this.repository.create({
      name: dto.name,
      slug,
      isActive: dto.isActive,
      createdBy: userId,
      isPublishable: () => dto.isActive,
    })
    return CarroceriaMapper.toDTO(created)
  }

  async update(
    id: string,
    dto: UpdateCarroceriaDTO
  ): Promise<CarroceriaResponseDTO> {
    if (!id) throw new ValidationError("El id es requerido")
    const updated = await this.repository.update(id, dto)
    if (!updated) throw new CarroceriaNotFoundError(id)
    return CarroceriaMapper.toDTO(updated)
  }

  async delete(id: string): Promise<CarroceriaResponseDTO> {
    if (!id) throw new ValidationError("El id es requerido")
    const deleted = await this.repository.delete(id)
    if (!deleted) throw new CarroceriaNotFoundError(id)
    return CarroceriaMapper.toDTO(deleted)
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
