import { MarcaEntity } from "@/modules/marca/domain/entities/Marca"

type MarcaData = Omit<
  MarcaEntity,
  "id" | "createdAt" | "updatedAt" | "isPublishable"
>
type MarcaUpdateData = Partial<
  Omit<MarcaEntity, "id" | "createdAt" | "updatedAt" | "isPublishable">
>

export interface IMarcaRepository {
  findAll(filter?: Record<string, unknown>): Promise<MarcaEntity[]>
  findById(id: string): Promise<MarcaEntity | null>
  findBySlug(slug: string): Promise<MarcaEntity | null>
  findActive(): Promise<MarcaEntity[]>
  create(data: MarcaData): Promise<MarcaEntity>
  update(id: string, data: MarcaUpdateData): Promise<MarcaEntity | null>
  delete(id: string): Promise<MarcaEntity | null>
}
