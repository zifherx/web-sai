import { LeadCorporativoEntity } from "@/modules/lead-corporativo/domain/entities/LeadCorporativo"
import {
  ICreateLeadCorporativoData,
  ILeadCorporativoRepository,
  LeadCorporativoFilters,
} from "@/modules/lead-corporativo/domain/repositories/ILeadCorporativoRepository"
import { LeadCorporativoDocument } from "@/modules/lead-corporativo/infrastructure/mongoose/MongooseLeadCorporativoSchema"
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

  private buildQuery(
    filters?: LeadCorporativoFilters
  ): Record<string, unknown> {
    if (!filters) return {}
    const query: Record<string, unknown> = {}
    if (filters.marcaId) query.marcaId = filters.marcaId
    if (filters.ciudad) query.ciudad = new RegExp(filters.ciudad, "i")
    if (filters.sector) query.sector = new RegExp(filters.sector, "i")
    return query
  }

  async findAll(
    filters?: LeadCorporativoFilters
  ): Promise<LeadCorporativoEntity[]> {
    const query = this.buildQuery(filters)
    const docs = await this.model.find(query).sort({ createdAt: -1 }).lean()
    return (docs as LeadCorporativoDocument[]).map((d) => this.toEntity(d))
  }

  async findById(id: string): Promise<LeadCorporativoEntity | null> {
    const doc = await this.model.findById(id).lean()
    return doc ? this.toEntity(doc as LeadCorporativoDocument) : null
  }

  async create(
    data: ICreateLeadCorporativoData
  ): Promise<LeadCorporativoEntity> {
    const doc = await this.model.create({
      ...data,
      marcaId: data.marcaId || null,
    })
    return this.toEntity(doc)
  }
}
