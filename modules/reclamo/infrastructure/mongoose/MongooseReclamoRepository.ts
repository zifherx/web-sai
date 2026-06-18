import { ReclamoEntity } from "@/modules/reclamo/domain/entities/Reclamo"
import {
  ICreateReclamoData,
  IReclamoRepository,
  ReclamoFilters,
} from "@/modules/reclamo/domain/repositories/IReclamoRepository"
import { ReclamoDocument } from "@/modules/reclamo/infrastructure/mongoose/MongooseReclamoSchema"
import { Model } from "mongoose"

export class MongooseReclamoRepository implements IReclamoRepository {
  constructor(private readonly model: Model<ReclamoDocument>) {}

  private toEntity(doc: ReclamoDocument): ReclamoEntity {
    return new ReclamoEntity(
      (doc._id as any).toString(),
      doc.fecha,
      doc.hora,
      doc.numeroReclamo,
      doc.tipoDocumento,
      doc.numeroDocumento,
      doc.nombres,
      doc.apellidos,
      doc.email,
      doc.celular,
      doc.departamento,
      doc.provincia,
      doc.distrito,
      doc.direccion,
      doc.tipoBien,
      doc.vin,
      doc.placa,
      doc.sedeCodexHR,
      doc.sedeCompra,
      doc.sedeDireccion,
      doc.moneda,
      doc.importeBien,
      doc.descripcionBien,
      doc.tipoSolicitud,
      doc.detalleSolicitud,
      doc.pedidoSolicitud,
      doc.isConforme,
      doc.razonSocial,
      doc.rucEmpresa,
      doc.createdAt,
      doc.updatedAt
    )
  }

  private buildQuery(filters?: ReclamoFilters): Record<string, unknown> {
    if (!filters) return {}
    const query: Record<string, unknown> = {}
    if (filters.tipoSolicitud) query.tipoSolicitud = filters.tipoSolicitud
    if (filters.sedeCodexHR)
      query.sedeCodexHR = filters.sedeCodexHR.toUpperCase()
    if (filters.fecha) query.fecha = filters.fecha
    return query
  }

  async findAll(filters?: ReclamoFilters): Promise<ReclamoEntity[]> {
    const docs = await this.model
      .find(this.buildQuery(filters))
      .sort({ createdAt: -1 })
      .lean()
    return (docs as ReclamoDocument[]).map(this.toEntity.bind(this))
  }

  async findById(id: string): Promise<ReclamoEntity | null> {
    const doc = await this.model.findById(id).lean()
    return doc ? this.toEntity(doc as ReclamoDocument) : null
  }

  async findLast(): Promise<ReclamoEntity | null> {
    const doc = await this.model.findOne().sort({ createdAt: -1 }).lean()
    return doc ? this.toEntity(doc as ReclamoDocument) : null
  }

  async create(data: ICreateReclamoData): Promise<ReclamoEntity> {
    const doc = await this.model.create(data)
    return this.toEntity(doc)
  }
}
