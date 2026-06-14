import { SystemEmailEntity } from "@/modules/system-email/domain/entities/System-Email"
import {
  ICreateSystemEmailData,
  ISystemEmailRepository,
} from "@/modules/system-email/domain/repositories/ISystemEmailRepository"
import { SystemEmailDocument } from "@/modules/system-email/infrastructure/mongoose/MongooseSystemEmailSchema"
import { Model } from "mongoose"

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

  // Queries
  async findAll(): Promise<SystemEmailEntity[]> {
    const docs = await this.model.find().lean()
    return (docs as SystemEmailDocument[]).map((d) => this.toEntity(d))
  }

  async findAllActive(): Promise<SystemEmailEntity[]> {
    const docs = await this.model.find({ isActive: true }).lean()
    return (docs as SystemEmailDocument[]).map(this.toEntity.bind(this))
  }

  async findById(id: string): Promise<SystemEmailEntity | null> {
    const doc = await this.model.findById(id).lean()
    return doc ? this.toEntity(doc as SystemEmailDocument) : null
  }

  async findByArea(area: string): Promise<SystemEmailEntity | null> {
    const doc = await this.model.findOne({ area, isActive: true }).lean()
    return doc ? this.toEntity(doc as SystemEmailDocument) : null
  }

  async create(data: ICreateSystemEmailData): Promise<SystemEmailEntity> {
    const doc = await this.model.create(data)
    return this.toEntity(doc)
  }
}
