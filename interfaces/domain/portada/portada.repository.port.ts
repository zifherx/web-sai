import type { PortadaEntity } from "@/interfaces/domain"

export interface IPortadaRepository {
  findAll(filter?: Record<string, unknown>): Promise<PortadaEntity[]>
  findById(id: string): Promise<PortadaEntity | null>
  findBySlug(slug: string): Promise<PortadaEntity | null>
  findActive(): Promise<PortadaEntity[]>
  create(
    data: Omit<PortadaEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<PortadaEntity>
  update(
    id: string,
    data: Partial<PortadaEntity>
  ): Promise<PortadaEntity | null>
  delete(id: string): Promise<PortadaEntity | null>
}
