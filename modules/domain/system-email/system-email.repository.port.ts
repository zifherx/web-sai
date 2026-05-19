import { SystemEmailArea, SystemEmailEntity } from "@/modules/domain"

export interface ISystemEmailRepository {
  findAll(): Promise<SystemEmailEntity[]>
  findByArea(area: SystemEmailArea | string): Promise<SystemEmailEntity | null>
  findAllActive(): Promise<SystemEmailEntity[]>
  create(
    data: Omit<SystemEmailEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<SystemEmailEntity>
}
