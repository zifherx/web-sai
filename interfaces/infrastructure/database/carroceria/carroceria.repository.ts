import { CarroceriaEntity, ICarroceriaRepository } from "@/interfaces/domain"
import { CarroceriaDocument } from "@/interfaces/infrastructure"
import { Model } from "mongoose"

export class MongooseCarroceriaRepository implements ICarroceriaRepository {
  constructor(private readonly model: Model<CarroceriaDocument>) {}

  private toEntity(doc: CarroceriaDocument): CarroceriaEntity {
    return {
      id: (doc._id as any).toString(),
      name: doc.name,
      slug: doc.slug,
      isActive: doc.isActive,
      createdBy: doc.createdBy,
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt),
      isPublishable: () => doc.isActive,
    } as CarroceriaEntity
  }

  async findAll(filter?: Record<string, unknown>): Promise<CarroceriaEntity[]> {
    const docs = await this.model.find(filter ?? {}).lean()
    return docs.map(this.toEntity)
  }

  async findById(id: string): Promise<CarroceriaEntity | null> {
    const doc = await this.model.findById(id).lean()
    return doc ? this.toEntity(doc as CarroceriaDocument) : null
  }

  async findBySlug(slug: string): Promise<CarroceriaEntity | null> {
    const doc = await this.model.findOne({ slug }).lean()
    return doc ? this.toEntity(doc as CarroceriaDocument) : null
  }

  async findActive(): Promise<CarroceriaEntity[]> {
    const docs = await this.model.find({ isActive: true }).lean()
    return (docs as CarroceriaDocument[]).map(this.toEntity)
  }

  async create(
    data: Omit<CarroceriaEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<CarroceriaEntity> {
    const doc = await this.model.create(data)
    return this.toEntity(doc)
  }

  async update(
    id: string,
    data: Partial<CarroceriaEntity>
  ): Promise<CarroceriaEntity | null> {
    const doc = await this.model
      .findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
      .lean()
    return doc ? this.toEntity(doc as CarroceriaDocument) : null
  }

  async delete(id: string): Promise<CarroceriaEntity | null> {
    const doc = await this.model.findByIdAndDelete(id).lean()
    return doc ? this.toEntity(doc as CarroceriaDocument) : null
  }
}
