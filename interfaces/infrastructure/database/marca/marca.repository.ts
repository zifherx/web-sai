import { IMarcaRepository, MarcaEntity } from "@/interfaces/domain"
import { MarcaDocument } from "@/interfaces/infrastructure"
import { Model } from "mongoose"

export class MongooseMarcaRepository implements IMarcaRepository {
  constructor(private readonly model: Model<MarcaDocument>) {}

  private toEntity(doc: MarcaDocument): MarcaEntity {
    return {
      id: (doc._id as any).toString(),
      name: doc.name,
      slug: doc.slug,
      imageUrl: doc.imageUrl,
      isActive: doc.isActive,
      idNovaly: doc.idNovaly,
      createdBy: doc.createdBy,
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt),
      isPublishable: () => doc.isActive && doc.imageUrl.length > 0,
    } as MarcaEntity
  }

  async findAll(filter?: Record<string, unknown>): Promise<MarcaEntity[]> {
    const docs = await this.model
      .find(filter ?? {})
      .sort({ name: 1 })
      .lean()
    return docs.map(this.toEntity)
  }

  async findById(id: string): Promise<MarcaEntity | null> {
    const doc = await this.model.findById(id).lean()
    return doc ? this.toEntity(doc as MarcaDocument) : null
  }

  async findBySlug(slug: string): Promise<MarcaEntity | null> {
    const doc = await this.model.findOne({ slug }).lean()
    return doc ? this.toEntity(doc as MarcaDocument) : null
  }

  async findActive(): Promise<MarcaEntity[]> {
    const docs = await this.model
      .find({ isActive: true })
      .sort({ name: 1 })
      .lean()
    return (docs as MarcaDocument[]).map(this.toEntity)
  }

  async create(
    data: Omit<MarcaEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<MarcaEntity> {
    const doc = await this.model.create(data)
    return this.toEntity(doc)
  }

  async update(
    id: string,
    data: Partial<MarcaEntity>
  ): Promise<MarcaEntity | null> {
    const doc = await this.model
      .findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
      .lean()
    return doc ? this.toEntity(doc as MarcaDocument) : null
  }

  async delete(id: string): Promise<MarcaEntity | null> {
    const doc = await this.model.findByIdAndDelete(id).lean()
    return doc ? this.toEntity(doc as MarcaDocument) : null
  }
}
