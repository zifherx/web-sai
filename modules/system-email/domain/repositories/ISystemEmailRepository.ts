import {
  SystemEmailArea,
  SystemEmailEntity,
} from "@/modules/system-email/domain/entities/System-Email"

export interface ICreateSystemEmailData {
  area: SystemEmailArea | string
  email: string
  isActive: boolean
  createdBy: string
}

export interface ISystemEmailRepository {
  findAll(): Promise<SystemEmailEntity[]>
  findAllActive(): Promise<SystemEmailEntity[]>
  findById(id: string): Promise<SystemEmailEntity | null>
  findByArea(area: SystemEmailArea | string): Promise<SystemEmailEntity | null>
  create(data: ICreateSystemEmailData): Promise<SystemEmailEntity>
}
