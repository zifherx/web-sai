import { CotizacionEntity } from "@/interfaces/domain/cotizacion/cotizacion.entity"
import {
  CotizacionFilters,
  ICotizacionRepository,
} from "@/interfaces/domain/cotizacion/cotizacion.repository.port"
import { Model } from "mongoose"
import { CotizacionDocument } from "./cotizacion.schema"

const POPULATE_COTIZACION_OPTIONS = [
  {
    path: "clienteId",
    select: "name tipoDocumento numeroDocumento celular email",
  },
  {
    path: "vehiculoId",
    select: "name slug imageUrl precioBase",
    populate: { path: "marcaId", select: "name" },
  },
  {
    path: "sedeId",
    select: "name ciudad codexHR",
  },
]

export class MongooseCotizacionRepository implements ICotizacionRepository {
  constructor(private readonly model: Model<CotizacionDocument>) {}

  private toEntity(doc: CotizacionDocument): CotizacionEntity {
    const cliente = doc.clienteId as any
    const vehiculo = doc.vehiculoId as any
    const sede = doc.sedeId as any

    // Determina si el campo fue populado (es objeto) o es solo ObjectId (string)
    const isPopulated = (v: any) => v && typeof v === "object" && v.name

    return new CotizacionEntity(
      (doc._id as any).toString(),
      isPopulated(cliente)
        ? cliente._id.toString()
        : (cliente?.toString() ?? ""),
      isPopulated(vehiculo)
        ? vehiculo._id.toString()
        : (vehiculo?.toString() ?? ""),
      isPopulated(sede) ? sede._id.toString() : (sede?.toString() ?? ""),
      doc.ciudad,
      doc.intencionCompra,
      // Campos populados opcionales
      isPopulated(cliente)
        ? {
            id: cliente._id.toString(),
            name: cliente.name,
            tipoDocumento: cliente.tipoDocumento,
            numeroDocumento: cliente.numeroDocumento,
            celular: cliente.celular,
            email: cliente.email,
          }
        : undefined,
      isPopulated(vehiculo)
        ? {
            id: vehiculo._id.toString(),
            name: vehiculo.name,
            slug: vehiculo.slug,
            imageUrl: vehiculo.imageUrl,
            precioBase: vehiculo.precioBase,
            marca: vehiculo.marcaId?.name ?? "",
          }
        : undefined,
      isPopulated(sede)
        ? {
            id: sede._id.toString(),
            name: sede.name,
            ciudad: sede.ciudad,
            codexHR: sede.codexHR,
          }
        : undefined,
      doc.createdAt,
      doc.updatedAt
    )
  }

  private buildQuery(filters?: CotizacionFilters): Record<string, unknown> {
    if (!filters) return {}
    const query: Record<string, unknown> = {}

    if (filters.from && filters.to) {
      query.createdAt = {
        $gte: new Date(filters.from),
        $lte: new Date(filters.to),
      }
    }
    if (filters.sedeId) query.sedeId = filters.sedeId
    if (filters.intencionCompra) query.intencionCompra = filters.intencionCompra

    return query
  }

  async findAll(filters?: CotizacionFilters): Promise<CotizacionEntity[]> {
    const docs = await this.model
      .find(this.buildQuery(filters))
      .sort({ createdAt: -1 })
      .populate(POPULATE_COTIZACION_OPTIONS)
      .lean()
    return (docs as CotizacionDocument[]).map(this.toEntity.bind(this))
  }

  async findById(id: string): Promise<CotizacionEntity | null> {
    const doc = await this.model
      .findById(id)
      .populate(POPULATE_COTIZACION_OPTIONS)
      .lean()
    return doc ? this.toEntity(doc as CotizacionDocument) : null
  }

  async create(data: {
    clienteId: string
    vehiculoId: string
    sedeId: string
    ciudad: string
    intencionCompra: string
  }): Promise<CotizacionEntity> {
    const doc = await this.model.create({
      clienteId: data.clienteId,
      vehiculoId: data.vehiculoId,
      sedeId: data.sedeId,
      ciudad: data.ciudad,
      intencionCompra: data.intencionCompra,
    })
    return this.toEntity(doc)
  }
}
