import { CitaEntity } from "@/interfaces/domain/cita/cita.entity"
import {
  CitaFilters,
  ICitaRepository,
  ICreateCitaData,
} from "@/interfaces/domain/cita/cita.repository.port"
import { Model } from "mongoose"
import { CitaDocument } from "./cita.schema"

const POPULATE_OPTIONS = [
  {
    path: "clienteId",
    select: "name tipoDocumento numeroDocumento celular email",
  },
  {
    path: "marcaId",
    select: "name slug imageUrl",
  },
  {
    path: "modeloId",
    select: "name slug imageUrl",
  },
  {
    path: "sedeId",
    select: "name ciudad codexHR address celularCitas",
  },
]

export class MongooseCitaRepository implements ICitaRepository {
  constructor(private readonly model: Model<CitaDocument>) {}

  private toEntity(doc: CitaDocument): CitaEntity {
    const cliente = doc.clienteId as any
    const marca = doc.marcaId as any
    const modelo = doc.modeloId as any
    const concesionario = doc.sedeId as any

    const isPopulated = (v: any) => v && typeof v === "object" && v.name

    return new CitaEntity(
      (doc._id as any).toString(),
      isPopulated(cliente)
        ? cliente._id.toString()
        : (cliente?.toString() ?? ""),
      doc.placa,
      doc.kilometraje,
      isPopulated(marca) ? marca._id.toString() : (marca?.toString() ?? ""),
      isPopulated(modelo) ? modelo._id.toString() : (modelo?.toString() ?? ""),
      doc.marcaFlat,
      doc.modeloFlat,
      isPopulated(concesionario)
        ? concesionario._id.toString()
        : (concesionario?.toString() ?? ""),
      doc.ciudadSede,
      doc.tipoServicio,
      doc.comentario,
      doc.whatsappMessage,
      doc.whatsappContact,
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
      isPopulated(marca)
        ? {
            id: marca._id.toString(),
            name: marca.name,
            slug: marca.slug,
            imageUrl: marca.imageUrl,
          }
        : undefined,
      isPopulated(modelo)
        ? {
            id: modelo._id.toString(),
            name: modelo.name,
            slug: modelo.slug,
            imageUrl: modelo.imageUrl,
          }
        : undefined,
      isPopulated(concesionario)
        ? {
            id: concesionario._id.toString(),
            name: concesionario.name,
            ciudad: concesionario.ciudad,
            codexHR: concesionario.codexHR,
            address: concesionario.address,
            celularCitas: concesionario.celularCitas ?? "",
          }
        : undefined,
      doc.createdAt,
      doc.updatedAt
    )
  }

  private buildQuery(filters?: CitaFilters): Record<string, unknown> {
    if (!filters) return {}
    const query: Record<string, unknown> = {}
    if (filters.sedeId) query.sedeId = filters.sedeId
    if (filters.tipoServicio) query.tipoServicio = filters.tipoServicio
    if (filters.from && filters.to) {
      query.createdAt = {
        $gte: new Date(filters.from),
        $lte: new Date(filters.to),
      }
    }
    return query
  }

  async findAll(filters?: CitaFilters): Promise<CitaEntity[]> {
    const docs = await this.model
      .find(this.buildQuery(filters))
      .sort({ createdAt: -1 })
      .populate(POPULATE_OPTIONS)
      .lean()
    return (docs as CitaDocument[]).map(this.toEntity.bind(this))
  }

  async findById(id: string): Promise<CitaEntity | null> {
    const doc = await this.model.findById(id).populate(POPULATE_OPTIONS).lean()
    return doc ? this.toEntity(doc as CitaDocument) : null
  }

  async create(data: ICreateCitaData): Promise<CitaEntity> {
    const doc = await this.model.create({
      clienteId: data.clienteId,
      placa: data.placa,
      kilometraje: data.kilometraje,
      marcaId: data.marcaId,
      modeloId: data.modeloId || null,
      marcaFlat: data.marcaFlat,
      modeloFlat: data.modeloFlat,
      sedeId: data.sedeId,
      ciudadSede: data.ciudadSede,
      tipoServicio: data.tipoServicio,
      comentario: data.comentario,
      whatsappMessage: data.whatsappMessage,
      whatsappContact: data.whatsappContact,
    })
    return this.toEntity(doc)
  }
}
