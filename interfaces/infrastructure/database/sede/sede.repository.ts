import { SedeEntity } from "@/interfaces/domain/sede/sede.entity"
import {
  ICreateSedeData,
  ISedeRepository,
  IUpdateSedeData,
  SedeFilters,
} from "@/interfaces/domain/sede/sede.repository.port"
import { parseMarca } from "@/lib"
import { Model, Types } from "mongoose"
import { SedeDocument } from "./sede.schema"

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
    return {
      id: (doc._id as any).toString(),
      name: doc.name,
      slug: doc.slug,
      idTiendaNovaly: doc.idTiendaNovaly,
      codexHR: doc.codexHR,
      imageUrl: doc.imageUrl,
      ciudad: doc.ciudad,
      address: doc.address,
      scheduleRegular: doc.scheduleRegular,
      scheduleExtended: doc.scheduleExtended,
      linkHowArrived: doc.linkHowArrived,
      // ObjectId[] → string[]
      marcasDisponiblesVentas: (doc.marcasDisponiblesVentas ?? []).map(
        parseMarca
      ),
      marcasDisponiblesTaller: (doc.marcasDisponiblesTaller ?? []).map(
        parseMarca
      ),
      coordenadasMapa: {
        latitud: doc.coordenadasMapa?.latitud ?? "",
        longitud: doc.coordenadasMapa?.longitud ?? "",
      },
      celularCitas: doc.celularCitas ?? "",
      isTaller: doc.isTaller,
      isActive: doc.isActive,
      createdBy: doc.createdBy,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      // Métodos de dominio
      isPublishable: () => doc.isActive,
      hasVentasMarcas: () => (doc.marcasDisponiblesVentas?.length ?? 0) > 0,
      hasTaller: () =>
        doc.isTaller && (doc.marcasDisponiblesTaller?.length ?? 0) > 0,
      hasMapa: () =>
        (doc.coordenadasMapa?.latitud?.length ?? 0) > 0 &&
        (doc.coordenadasMapa?.longitud?.length ?? 0) > 0,
    } as SedeEntity
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
    return (docs as SedeDocument[]).map(this.toEntity.bind(this))
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
    return (docs as SedeDocument[]).map(this.toEntity.bind(this))
  }

  async findByCiudad(ciudad: string): Promise<SedeEntity[]> {
    const docs = await this.model
      .find({ ciudad: new RegExp(ciudad, "i"), isActive: true })
      .populate(POPULATE_MARCAS_TALLER)
      .populate(POPULATE_MARCAS_VENTAS)
      .lean()
    return (docs as SedeDocument[]).map(this.toEntity.bind(this))
  }

  async findTalleres(): Promise<SedeEntity[]> {
    const docs = await this.model
      .find({ isTaller: true, isActive: true })
      .populate(POPULATE_MARCAS_TALLER)
      .populate(POPULATE_MARCAS_VENTAS)
      .lean()
    return (docs as SedeDocument[]).map(this.toEntity.bind(this))
  }

  async create(data: ICreateSedeData): Promise<SedeEntity> {
    const doc = await this.model.create({
      name: data.name,
      slug: data.slug,
      idTiendaNovaly: data.idTiendaNovaly,
      codexHR: data.codexHR,
      imageUrl: data.imageUrl,
      ciudad: data.ciudad,
      address: data.address,
      scheduleRegular: data.scheduleRegular,
      scheduleExtended: data.scheduleExtended,
      linkHowArrived: data.linkHowArrived,
      marcasDisponiblesVentas: idsToObjectIds(data.marcasDisponiblesVentas),
      marcasDisponiblesTaller: idsToObjectIds(data.marcasDisponiblesTaller),
      coordenadasMapa: data.coordenadasMapa,
      celularCitas: data.celularCitas,
      isTaller: data.isTaller,
      isActive: data.isActive,
      createdBy: data.createdBy,
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
    if (data.linkHowArrived !== undefined)
      update.linkHowArrived = data.linkHowArrived
    if (data.coordenadasMapa !== undefined)
      update.coordenadasMapa = data.coordenadasMapa
    if (data.celularCitas !== undefined) update.celularCitas = data.celularCitas
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
        { new: true, runValidators: true }
      )
      .lean()
    return doc ? this.toEntity(doc as SedeDocument) : null
  }

  async delete(id: string): Promise<SedeEntity | null> {
    const doc = await this.model.findByIdAndDelete(id).lean()
    return doc ? this.toEntity(doc as SedeDocument) : null
  }
}
