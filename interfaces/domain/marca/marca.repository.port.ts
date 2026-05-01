import { MarcaEntity } from "./marca.entity"

export interface IMarcaRepository {
  findAll(filter?: Record<string, unknown>): Promise<MarcaEntity[]>
  findById(id: string): Promise<MarcaEntity | null>
  findBySlug(slug: string): Promise<MarcaEntity | null>
  findActive(): Promise<MarcaEntity[]>
  create(
    data: Omit<MarcaEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<MarcaEntity>
  update(id: string, data: Partial<MarcaEntity>): Promise<MarcaEntity | null>
  delete(id: string): Promise<MarcaEntity | null>
}
