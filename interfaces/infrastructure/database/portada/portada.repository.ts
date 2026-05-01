/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortadaEntity } from "@/interfaces/domain/portada/portada.entity"
import { IPortadaRepository } from "@/interfaces/domain/portada/portada.repository.port"
import { Model } from "mongoose"
import { PortadaDocument } from "./portada.schema"

export class MongoosePortadaRepository implements IPortadaRepository {
  constructor(private readonly model: Model<PortadaDocument>) {}

  private toEntity(doc: PortadaDocument): PortadaEntity {
    return {
      id: (doc._id as any).toString(),
      name: doc.name,
      slug: doc.slug,
      imageUrl: doc.imageUrl,
      isActive: doc.isActive,
      createdBy: doc.createdBy,
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt),
      isPublishable: () => doc.isActive && doc.imageUrl.length > 0,
    } as PortadaEntity
  }

  async findAll(filter?: Record<string, unknown>): Promise<PortadaEntity[]> {
    const docs = await this.model.find(filter ?? {}).lean()
    return docs.map(this.toEntity)
  }

  async findById(id: string): Promise<PortadaEntity | null> {
    const doc = await this.model.findById(id).lean()
    return doc ? this.toEntity(doc as PortadaDocument) : null
  }

  async findBySlug(slug: string): Promise<PortadaEntity | null> {
    const doc = await this.model.findOne({ slug }).lean()
    return doc ? this.toEntity(doc as PortadaDocument) : null
  }

  async findActive(): Promise<PortadaEntity[]> {
    const docs = await this.model.find({ isActive: true }).lean()
    return (docs as PortadaDocument[]).map(this.toEntity)
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
      .findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
      .lean()
    return doc ? this.toEntity(doc as PortadaDocument) : null
  }

  async delete(id: string): Promise<PortadaEntity | null> {
    const doc = await this.model.findByIdAndDelete(id).lean()
    return doc ? this.toEntity(doc as PortadaDocument) : null
  }
}
