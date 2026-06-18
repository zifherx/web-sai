import { PortadaEntity } from "@/modules/portada/domain/entities/Portada"

type PortadaData = Omit<
  PortadaEntity,
  "id" | "createdAt" | "updatedAt" | "isPublishable"
>
type PortadaUpdateData = Partial<
  Omit<PortadaEntity, "id" | "createdAt" | "updatedAt" | "isPublishable">
>

export interface IPortadaRepository {
  findAll(filter?: Record<string, unknown>): Promise<PortadaEntity[]>
  findById(id: string): Promise<PortadaEntity | null>
  findBySlug(slug: string): Promise<PortadaEntity | null>
  findActive(): Promise<PortadaEntity[]>
  create(data: PortadaData): Promise<PortadaEntity>
  update(id: string, data: PortadaUpdateData): Promise<PortadaEntity | null>
  delete(id: string): Promise<PortadaEntity | null>
}
