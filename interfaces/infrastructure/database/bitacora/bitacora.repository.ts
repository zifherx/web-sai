import { BitacoraEntity } from "@/interfaces/domain/bitacora/bitacora.entity"
import {
  IBitacoraRepository,
  ICreateBitacoraData,
} from "@/interfaces/domain/bitacora/bitacora.repository.port"
import { Model } from "mongoose"
import { BitacoraDocument } from "./bitacora.schema"

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

  async findAll(): Promise<BitacoraEntity[]> {
    const docs = await this.model.find().sort({ createdAt: -1 }).lean()
    return (docs as BitacoraDocument[]).map(this.toEntity.bind(this))
  }

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
