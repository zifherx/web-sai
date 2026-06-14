import { CarroceriaEntity } from "@/modules/carroceria/domain/entities/Carroceria"

export interface ICarroceriaRepository {
  findAll(filter?: Record<string, unknown>): Promise<CarroceriaEntity[]>
  findById(id: string): Promise<CarroceriaEntity | null>
  findBySlug(slug: string): Promise<CarroceriaEntity | null>
  findActive(): Promise<CarroceriaEntity[]>
  create(
    data: Omit<
      CarroceriaEntity,
      "id" | "createdAt" | "updatedAt" | "isPublishable"
    >
  ): Promise<CarroceriaEntity>
  update(
    id: string,
    data: Partial<CarroceriaEntity>
  ): Promise<CarroceriaEntity | null>
  delete(id: string): Promise<CarroceriaEntity | null>
}
