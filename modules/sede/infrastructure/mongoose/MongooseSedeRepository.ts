import { parseMarca } from "@/lib"
import { SedeEntity } from "@/modules/sede/domain/entities/Sede"
import {
  ICreateSedeData,
  ISedeRepository,
  IUpdateSedeData,
  SedeFilters,
} from "@/modules/sede/domain/repositories/ISedeRepository"
import { SedeDocument } from "@/modules/sede/infrastructure/mongoose/MongooseSedeSchema"
import { Model, Types } from "mongoose"

const POPULATE_MARCAS_TALLER = {
  path: "marcasDisponiblesTaller",
  select: "name slug imageUrl",
}

const POPULATE_MARCAS_VENTAS = {
  path: "marcasDisponiblesVentas",
  select: "name slug imageUrl",
}

function idsToObjectIds(ids: string[]): Types.ObjectId[] {
  return ids
    .filter((id) => Types.ObjectId.isValid(id))
    .map((id) => new Types.ObjectId(id))
}

export class MongooseSedeRepository implements ISedeRepository {
  constructor(private readonly model: Model<SedeDocument>) {}

  private toEntity(doc: SedeDocument): SedeEntity {
    return new SedeEntity(
      (doc._id as any).toString(),
      doc.name,
      doc.slug,
      doc.idTiendaNovaly,
      doc.codexHR,
      doc.imageUrl,
      doc.ciudad,
      doc.address,
      doc.scheduleRegular,
      doc.scheduleExtended,
      doc.horarioVentas ?? {
        scheduleRegular: "",
        scheduleExtended: "",
      },
      doc.horarioTaller ?? {
        scheduleRegular: "",
        scheduleExtended: "",
      },
      doc.linkHowArrived,
      (doc.marcasDisponiblesVentas ?? []).map(parseMarca),
      (doc.marcasDisponiblesTaller ?? []).map(parseMarca),
      {
        latitud: doc.coordenadasMapa?.latitud ?? "",
        longitud: doc.coordenadasMapa?.longitud ?? "",
      },
      doc.celularCitas ?? "",
      doc.correoCitas ?? "",
      doc.isTaller,
      doc.isActive,
      doc.createdBy,
      doc.createdAt,
      doc.updatedAt
    )
  }

  private buildQuery(filters?: SedeFilters): Record<string, unknown> {
    if (!filters) return {}
    const query: Record<string, unknown> = {}

    if (filters.isActive !== undefined) query.isActive = filters.isActive
    if (filters.isTaller !== undefined) query.isTaller = filters.isTaller
    if (filters.ciudad) query.ciudad = new RegExp(filters.ciudad, "i")
    if (filters.marcaVentaId)
      query.marcasDisponiblesVentas = filters.marcaVentaId
    if (filters.marcaTallerId)
      query.marcasDisponiblesTaller = filters.marcaTallerId

    return query
  }

  async findAll(filters?: SedeFilters): Promise<SedeEntity[]> {
    const docs = await this.model
      .find(this.buildQuery(filters))
      .populate(POPULATE_MARCAS_TALLER)
      .populate(POPULATE_MARCAS_VENTAS)
      .lean()
    return (docs as SedeDocument[]).map((d) => this.toEntity(d))
  }

  async findById(id: string): Promise<SedeEntity | null> {
    const doc = await this.model
      .findById(id)
      .populate(POPULATE_MARCAS_TALLER)
      .populate(POPULATE_MARCAS_VENTAS)
      .lean()
    return doc ? this.toEntity(doc as SedeDocument) : null
  }

  async findBySlug(slug: string): Promise<SedeEntity | null> {
    const doc = await this.model
      .findOne({ slug })
      .populate(POPULATE_MARCAS_TALLER)
      .populate(POPULATE_MARCAS_VENTAS)
      .lean()
    return doc ? this.toEntity(doc as SedeDocument) : null
  }

  async findActive(
    filters?: Omit<SedeFilters, "isActive">
  ): Promise<SedeEntity[]> {
    const query = this.buildQuery({ ...filters, isActive: true })
    const docs = await this.model
      .find(query)
      .populate(POPULATE_MARCAS_TALLER)
      .populate(POPULATE_MARCAS_VENTAS)
      .lean()
    return (docs as SedeDocument[]).map((d) => this.toEntity(d))
  }

  async findByCiudad(ciudad: string): Promise<SedeEntity[]> {
    const docs = await this.model
      .find({ ciudad: new RegExp(ciudad, "i"), isActive: true })
      .populate(POPULATE_MARCAS_TALLER)
      .populate(POPULATE_MARCAS_VENTAS)
      .lean()
    return (docs as SedeDocument[]).map((d) => this.toEntity(d))
  }

  async findTalleres(): Promise<SedeEntity[]> {
    const docs = await this.model
      .find({ isTaller: true, isActive: true })
      .populate(POPULATE_MARCAS_TALLER)
      .populate(POPULATE_MARCAS_VENTAS)
      .lean()
    return (docs as SedeDocument[]).map((d) => this.toEntity(d))
  }

  async findByMarcaVentas(marcaId: string): Promise<SedeEntity[]> {
    if (!Types.ObjectId.isValid(marcaId)) return []

    const docs = await this.model
      .find({
        isActive: true,
        marcasDisponiblesVentas: { $in: [new Types.ObjectId(marcaId)] },
      })
      .populate(POPULATE_MARCAS_TALLER)
      .populate(POPULATE_MARCAS_VENTAS)
      .lean()

    return (docs as SedeDocument[]).map((d) => this.toEntity(d))
  }

  async create(data: ICreateSedeData): Promise<SedeEntity> {
    const doc = await this.model.create({
      ...data,
      marcasDisponiblesVentas: idsToObjectIds(data.marcasDisponiblesVentas),
      marcasDisponiblesTaller: idsToObjectIds(data.marcasDisponiblesTaller),
    })
    return this.toEntity(doc)
  }

  async update(id: string, data: IUpdateSedeData): Promise<SedeEntity | null> {
    // Mapeo explícito: solo actualiza los campos que llegan
    const update: Record<string, unknown> = {}

    if (data.name !== undefined) update.name = data.name
    if (data.slug !== undefined) update.slug = data.slug
    if (data.idTiendaNovaly !== undefined)
      update.idTiendaNovaly = data.idTiendaNovaly
    if (data.codexHR !== undefined) update.codexHR = data.codexHR
    if (data.imageUrl !== undefined) update.imageUrl = data.imageUrl
    if (data.ciudad !== undefined) update.ciudad = data.ciudad
    if (data.address !== undefined) update.address = data.address
    if (data.scheduleRegular !== undefined)
      update.scheduleRegular = data.scheduleRegular
    if (data.scheduleExtended !== undefined)
      update.scheduleExtended = data.scheduleExtended
    if (data.horarioVentas !== undefined)
      update.horarioVentas = data.horarioVentas
    if (data.horarioTaller !== undefined)
      update.horarioTaller = data.horarioTaller
    if (data.linkHowArrived !== undefined)
      update.linkHowArrived = data.linkHowArrived
    if (data.coordenadasMapa !== undefined)
      update.coordenadasMapa = data.coordenadasMapa
    if (data.celularCitas !== undefined) update.celularCitas = data.celularCitas
    if (data.correoCitas !== undefined) update.correoCitas = data.correoCitas
    if (data.isTaller !== undefined) update.isTaller = data.isTaller
    if (data.isActive !== undefined) update.isActive = data.isActive
    if (data.marcasDisponiblesVentas !== undefined)
      update.marcasDisponiblesVentas = idsToObjectIds(
        data.marcasDisponiblesVentas
      )
    if (data.marcasDisponiblesTaller !== undefined)
      update.marcasDisponiblesTaller = idsToObjectIds(
        data.marcasDisponiblesTaller
      )

    const doc = await this.model
      .findByIdAndUpdate(
        id,
        { $set: update },
        { returnDocument: "after", runValidators: true }
      )
      .lean()
    return doc ? this.toEntity(doc as SedeDocument) : null
  }

  async delete(id: string): Promise<SedeEntity | null> {
    const doc = await this.model.findByIdAndDelete(id).lean()
    return doc ? this.toEntity(doc as SedeDocument) : null
  }
}
