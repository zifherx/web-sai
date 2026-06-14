import { BitacoraEntity } from "@/modules/bitacora/domain/entitites/Bitacora"
import {
  BitacoraFilters,
  IBitacoraRepository,
  ICreateBitacoraData,
} from "@/modules/bitacora/domain/repositories/IBitacoraRepository"
import { BitacoraDocument } from "@/modules/bitacora/infrastructure/mongoose/MongooseBitacoraSchema"
import { Model } from "mongoose"

export class MongooseBitacoraRepository implements IBitacoraRepository {
  constructor(private readonly model: Model<BitacoraDocument>) {}

  private toEntity(doc: BitacoraDocument): BitacoraEntity {
    return new BitacoraEntity(
      (doc._id as any).toString(),
      doc.request,
      doc.response,
      doc.method,
      doc.url,
      doc.date,
      doc.createdAt,
      doc.updatedAt
    )
  }

  private buildQuery(filters?: BitacoraFilters): Record<string, unknown> {
    if (!filters) return {}
    const query: Record<string, unknown> = {}

    if (filters.from && filters.to) {
      query.createdAt = {
        $gte: new Date(filters.from),
        $lte: new Date(filters.to),
      }
    }
    if (filters.responseCode !== undefined) {
      query["response.code"] = filters.responseCode
    }

    return query
  }

  // Queries

  async findAll(filters?: BitacoraFilters): Promise<BitacoraEntity[]> {
    const docs = await this.model
      .find(this.buildQuery(filters))
      .sort({ createdAt: -1 })
      .lean()
    return (docs as BitacoraDocument[]).map((d) => this.toEntity(d))
  }

  // Commands

  async create(data: ICreateBitacoraData): Promise<BitacoraEntity> {
    const doc = await this.model.create({
      request: data.request,
      response: data.response,
      method: data.method,
      url: data.url,
    })
    return this.toEntity(doc)
  }
}
