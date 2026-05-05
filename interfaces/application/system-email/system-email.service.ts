import {
  ISystemEmailRepository,
  SystemEmailArea,
  SystemEmailEntity,
} from "@/interfaces/domain"

export class SystemEmailService {
  constructor(private readonly repository: ISystemEmailRepository) {}

  async getAll(): Promise<SystemEmailEntity[]> {
    return this.repository.findAll()
  }

  async getByArea(area: SystemEmailArea | string): Promise<string | null> {
    const entity = await this.repository.findByArea(area)
    return entity?.email ?? null
  }

  async create(
    data: Omit<SystemEmailEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<SystemEmailEntity> {
    return this.repository.create(data)
  }
}
