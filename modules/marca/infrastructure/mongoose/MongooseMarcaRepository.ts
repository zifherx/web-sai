import { MarcaEntity } from "@/modules/marca/domain/entities/Marca"
import { IMarcaRepository } from "@/modules/marca/domain/repositories/IMarcaRepository"
import { MarcaDocument } from "@/modules/marca/infrastructure/mongoose/Marca.schema"
import { Model } from "mongoose"

export class MongooseMarcaRepository implements IMarcaRepository {
  constructor(private readonly model: Model<MarcaDocument>) {}

  private toEntity(doc: MarcaDocument): MarcaEntity {
    return new MarcaEntity(
      (doc._id as any).toString(),
      doc.name,
      doc.slug,
      doc.imageUrl,
      doc.idNovaly,
      doc.isActive,
      doc.createdBy,
      new Date(doc.createdAt),
      new Date(doc.updatedAt)
    )
  }

  async findAll(filter?: Record<string, unknown>): Promise<MarcaEntity[]> {
    const docs = await this.model
      .find(filter ?? {})
      .sort({ name: 1 })
      .lean()
    return (docs as MarcaDocument[]).map(this.toEntity)
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
    data: Omit<MarcaEntity, "id" | "createdAt" | "updatedAt" | "isPublishable">
  ): Promise<MarcaEntity> {
    const doc = await this.model.create(data)
    return this.toEntity(doc)
  }

  async update(
    id: string,
    data: Partial<
      Omit<MarcaEntity, "id" | "createdAt" | "updatedAt" | "isPublishable">
    >
  ): Promise<MarcaEntity | null> {
    const doc = await this.model
      .findByIdAndUpdate(
        id,
        { $set: data },
        { returnDocument: "after", runValidators: true }
      )
      .lean()
    return doc ? this.toEntity(doc as MarcaDocument) : null
  }

  async delete(id: string): Promise<MarcaEntity | null> {
    const doc = await this.model.findByIdAndDelete(id).lean()
    return doc ? this.toEntity(doc as MarcaDocument) : null
  }
}
