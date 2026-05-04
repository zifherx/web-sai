import { SystemEmailEntity } from "@/interfaces/domain/system-email/system-email.entity"
import { ISystemEmailRepository } from "@/interfaces/domain/system-email/system-email.repository.port"
import { Model } from "mongoose"
import { SystemEmailDocument } from "./system-email.schema"

export class MongooseSystemEmailRepository implements ISystemEmailRepository {
  constructor(private readonly model: Model<SystemEmailDocument>) {}

  private toEntity(doc: SystemEmailDocument): SystemEmailEntity {
    return new SystemEmailEntity(
      (doc._id as any).toString(),
      doc.area,
      doc.email,
      doc.isActive,
      doc.createdBy,
      doc.createdAt,
      doc.updatedAt
    )
  }

  async findAll(): Promise<SystemEmailEntity[]> {
    const docs = await this.model.find().lean()
    return (docs as SystemEmailDocument[]).map(this.toEntity.bind(this))
  }

  async findByArea(area: string): Promise<SystemEmailEntity | null> {
    const doc = await this.model.findOne({ area, isActive: true }).lean()
    return doc ? this.toEntity(doc as SystemEmailDocument) : null
  }

  async findAllActive(): Promise<SystemEmailEntity[]> {
    const docs = await this.model.find({ isActive: true }).lean()
    return (docs as SystemEmailDocument[]).map(this.toEntity.bind(this))
  }

  async create(
    data: Omit<SystemEmailEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<SystemEmailEntity> {
    const doc = await this.model.create(data)
    return this.toEntity(doc)
  }
}
