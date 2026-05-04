import { ReclamoEntity } from "./reclamo.entity"

export interface ReclamoFilters {
  tipoSolicitud?: string // "reclamo" | "queja"
  sedeCodexHR?: string
  fecha?: string
}

export interface IReclamoRepository {
  findAll(filters?: ReclamoFilters): Promise<ReclamoEntity[]>
  findById(id: string): Promise<ReclamoEntity | null>
  findLast(): Promise<ReclamoEntity | null>
  create(
    data: Omit<ReclamoEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<ReclamoEntity>
}
