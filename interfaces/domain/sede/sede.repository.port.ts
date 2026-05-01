import { SedeEntity } from "./sede.entity"

export interface SedeFilters {
  ciudad?: string
  isActive?: boolean
  isTaller?: boolean
  marcaVentaId?: string
  marcaTallerId?: string
}

export interface ISedeRepository {
  findAll(filters?: SedeFilters): Promise<SedeEntity[]>
  findById(id: string): Promise<SedeEntity | null>
  findBySlug(slug: string): Promise<SedeEntity | null>
  findActive(filters?: Omit<SedeFilters, "isActive">): Promise<SedeEntity[]>
  findByCiudad(ciudad: string): Promise<SedeEntity[]>
  findTalleres(): Promise<SedeEntity[]>
  create(
    data: Omit<
      SedeEntity,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "isPublishable"
      | "hasVentasMarcas"
      | "hasTaller"
      | "hasMapa"
    >
  ): Promise<SedeEntity>
  update(id: string, data: Partial<SedeEntity>): Promise<SedeEntity | null>
  delete(id: string): Promise<SedeEntity | null>
}
