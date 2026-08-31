import { PortadaEntity } from "@/modules/portada/domain/entities/Portada"
import type { IPortadaRepository } from "@/modules/portada/domain/repositories/IPortadaRepository"
import { Model, Types } from "mongoose"
import { PortadaDocument } from "./portada-mongoose.schema"

type PopulatedCreatedBy =
  | {
      _id: Types.ObjectId
      name: string
    }
  | Types.ObjectId
  | null

type PortadaLeanDoc = Omit<PortadaDocument, "createdBy"> & {
  createdBy: PopulatedCreatedBy
}

export class MongoosePortadaRepository implements IPortadaRepository {
  constructor(private readonly model: Model<PortadaDocument>) {}

  private toEntity(doc: PortadaLeanDoc): PortadaEntity {
    const isPopulated =
      doc.createdBy !== null &&
      typeof doc.createdBy === "object" &&
      "name" in doc.createdBy

    const createdById = isPopulated
      ? (doc.createdBy as { _id: Types.ObjectId })._id.toString()
      : (doc.createdBy?.toString() ?? "")

    const createdByNombre = isPopulated
      ? (doc.createdBy as unknown as { name: string }).name
      : undefined

    return new PortadaEntity(
      (doc._id as Types.ObjectId).toString(),
      doc.name,
      doc.slug,
      doc.imageUrl,
      doc.isActive,
      createdById,
      new Date(doc.createdAt),
      new Date(doc.updatedAt),
      createdByNombre
    )
  }

  async findAll(filter?: Record<string, unknown>): Promise<PortadaEntity[]> {
    const docs = await this.model
      .find(filter ?? {})
      .sort({ isActive: -1 })
      .populate<{ createdBy: PopulatedCreatedBy }>({
        path: "createdBy",
        select: "name",
      })
      .lean()
    return (docs as unknown as PortadaLeanDoc[]).map((doc) =>
      this.toEntity(doc)
    )
  }

  async findById(id: string): Promise<PortadaEntity | null> {
    const doc = await this.model
      .findById(id)
      .populate<{ createdBy: PopulatedCreatedBy }>({
        path: "createdBy",
        select: "name",
      })
      .lean()
    return doc ? this.toEntity(doc as unknown as PortadaLeanDoc) : null
  }

  async findBySlug(slug: string): Promise<PortadaEntity | null> {
    const doc = await this.model.findOne({ slug }).lean()
    return doc ? this.toEntity(doc as unknown as PortadaLeanDoc) : null
  }

  async findActive(): Promise<PortadaEntity[]> {
    const docs = await this.model
      .find({ isActive: true })
      .populate<{ createdBy: PopulatedCreatedBy }>({
        path: "createdBy",
        select: "name",
      })
      .lean()
    return (docs as unknown as PortadaLeanDoc[]).map((doc) =>
      this.toEntity(doc)
    )
  }

  async create(
    data: Omit<PortadaEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<PortadaEntity> {
    const doc = await this.model.create(data)
    return this.toEntity(doc)
  }

  async update(
    id: string,
    data: Partial<PortadaEntity>
  ): Promise<PortadaEntity | null> {
    const doc = await this.model
      .findByIdAndUpdate(
        id,
        { $set: data },
        { returnDocument: "after", runValidators: true }
      )
      .lean()
    return doc ? this.toEntity(doc as PortadaLeanDoc) : null
  }

  async delete(id: string): Promise<PortadaEntity | null> {
    const doc = await this.model.findByIdAndDelete(id).lean()
    return doc ? this.toEntity(doc as PortadaLeanDoc) : null
  }
}
