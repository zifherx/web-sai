import {
  ILeadCorporativoRepository,
  LeadCorporativoEntity,
} from "@/interfaces/domain"
import { LeadCorporativoDocument } from "@/interfaces/infrastructure"
import { Model } from "mongoose"

export class MongooseLeadCorporativoRepository implements ILeadCorporativoRepository {
  constructor(private readonly model: Model<LeadCorporativoDocument>) {}

  private toEntity(doc: LeadCorporativoDocument): LeadCorporativoEntity {
    return new LeadCorporativoEntity(
      (doc._id as any).toString(),
      doc.nombres,
      doc.apellidos,
      doc.dni,
      doc.correoElectronico,
      doc.celular,
      doc.razonSocial,
      doc.ruc,
      doc.marcaId?.toString() ?? "",
      doc.marcaText,
      doc.ciudad,
      doc.intencionCompra,
      doc.sector,
      doc.fechaCreacion,
      doc.createdAt,
      doc.updatedAt
    )
  }

  async findAll(): Promise<LeadCorporativoEntity[]> {
    const docs = await this.model.find().sort({ createdAt: -1 }).lean()
    return (docs as LeadCorporativoDocument[]).map(this.toEntity.bind(this))
  }

  async findById(id: string): Promise<LeadCorporativoEntity | null> {
    const doc = await this.model.findById(id).lean()
    return doc ? this.toEntity(doc as LeadCorporativoDocument) : null
  }

  async create(
    data: Omit<LeadCorporativoEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<LeadCorporativoEntity> {
    const doc = await this.model.create({
      ...data,
      marcaId: data.marcaId || null,
    })
    return this.toEntity(doc)
  }
}
