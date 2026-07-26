import { VehiculoEntity } from "@/modules/vehiculo/domain/entities/Vehiculo"
import {
  ICreateVehiculoData,
  IUpdateVehiculoData,
  IVehiculoRepository,
  VehiculoFilters,
} from "@/modules/vehiculo/domain/repositories/IVehiculoRepository"
import { VehiculoDocument } from "@/modules/vehiculo/infrastructure/mongoose/MongooseVehiculoSchema"
import { Model } from "mongoose"

export class MongooseVehiculoRepository implements IVehiculoRepository {
  constructor(private readonly model: Model<VehiculoDocument>) {}

  private toEntity(doc: VehiculoDocument): VehiculoEntity {
    return new VehiculoEntity(
      (doc._id as any).toString(),
      doc.name,
      doc.slug,
      doc.codigo_flashdealer,
      doc.imageUrl,
      doc.precioBase,
      doc.fichaTecnica,
      doc.marca?.toString() ?? "",
      doc.carroceria?.toString() ?? "",
      doc.isEntrega48H,
      doc.isGLP,
      doc.isLiquidacion,
      doc.isNuevo,
      doc.colores ?? [],
      doc.features ?? { feature1: [], feature2: [] },
      doc.galeria ?? [],
      doc.isActive,
      doc.createdBy,
      doc.createdAt,
      doc.updatedAt
    )
  }

  private buildQuery(filters?: VehiculoFilters): Record<string, unknown> {
    if (!filters) return {}
    const query: Record<string, unknown> = {}

    if (filters.isActive !== undefined) query.isActive = filters.isActive
    if (filters.isNuevo !== undefined) query.isNuevo = filters.isNuevo
    if (filters.isGLP !== undefined) query.isGLP = filters.isGLP
    if (filters.isLiquidacion !== undefined)
      query.isLiquidacion = filters.isLiquidacion
    if (filters.isEntrega48H !== undefined)
      query.isEntrega48H = filters.isEntrega48H
    if (filters.marcaId) query.marca = filters.marcaId
    if (filters.carroceriaId) query.carroceria = filters.carroceriaId
    if (filters.slug) query.slug = filters.slug
    if (filters.precioMin !== undefined || filters.precioMax !== undefined) {
      const rango: Record<string, number> = {}
      if (filters.precioMin !== undefined) rango.$gte = filters.precioMin
      if (filters.precioMax !== undefined) rango.$lte = filters.precioMax
      query.precioBase = rango
    }
    return query
  }

  // Queries
  async findAll(filters?: VehiculoFilters): Promise<VehiculoEntity[]> {
    const query = this.buildQuery(filters)
    const docs = await this.model.find(query).sort({ precioBase: 1 }).lean()
    return (docs as VehiculoDocument[]).map((d) => this.toEntity(d))
  }

  async findById(id: string): Promise<VehiculoEntity | null> {
    const doc = await this.model.findById(id).lean()
    return doc ? this.toEntity(doc as VehiculoDocument) : null
  }

  async findBySlug(slug: string): Promise<VehiculoEntity | null> {
    const doc = await this.model.findOne({ slug }).lean()
    return doc ? this.toEntity(doc as VehiculoDocument) : null
  }

  async findActive(
    filters?: Omit<VehiculoFilters, "isActive">
  ): Promise<VehiculoEntity[]> {
    const query = this.buildQuery({ ...filters, isActive: true })
    const docs = await this.model.find(query).sort({ precioBase: 1 }).lean()
    return (docs as VehiculoDocument[]).map((d) => this.toEntity(d))
  }

  async findByMarca(marcaId: string): Promise<VehiculoEntity[]> {
    const docs = await this.model
      .find({ marca: marcaId, isActive: true })
      .sort({ precioBase: 1 })
      .lean()
    return (docs as VehiculoDocument[]).map((d) => this.toEntity(d))
  }

  async create(data: ICreateVehiculoData): Promise<VehiculoEntity> {
    const doc = await this.model.create({
      name: data.name,
      slug: data.slug,
      codigo_flashdealer: data.codigoFlashdealer,
      imageUrl: data.imageUrl,
      precioBase: data.precioBase,
      fichaTecnica: data.fichaTecnica,
      marca: data.marcaId,
      carroceria: data.carroceriaId,
      isEntrega48H: data.isEntrega48H,
      isGLP: data.isGLP,
      isLiquidacion: data.isLiquidacion,
      isNuevo: data.isNuevo,
      isActive: data.isActive,
      colores: data.colores,
      features: data.features,
      galeria: data.galeria,
      createdBy: data.createdBy,
    })
    return this.toEntity(doc)
  }

  async update(
    id: string,
    data: IUpdateVehiculoData
  ): Promise<VehiculoEntity | null> {
    // Mapea los campos de dominio a los nombres de Mongoose
    const update: Record<string, unknown> = {}

    if (data.name !== undefined) update.name = data.name
    if (data.slug !== undefined) update.slug = data.slug
    if (data.codigoFlashdealer !== undefined)
      update.codigo_flashdealer = data.codigoFlashdealer
    if (data.imageUrl !== undefined) update.imageUrl = data.imageUrl
    if (data.precioBase !== undefined) update.precioBase = data.precioBase
    if (data.fichaTecnica !== undefined) update.fichaTecnica = data.fichaTecnica
    if (data.marcaId !== undefined) update.marca = data.marcaId
    if (data.carroceriaId !== undefined) update.carroceria = data.carroceriaId
    if (data.isEntrega48H !== undefined) update.isEntrega48H = data.isEntrega48H
    if (data.isGLP !== undefined) update.isGLP = data.isGLP
    if (data.isLiquidacion !== undefined)
      update.isLiquidacion = data.isLiquidacion
    if (data.isNuevo !== undefined) update.isNuevo = data.isNuevo
    if (data.isActive !== undefined) update.isActive = data.isActive
    if (data.colores !== undefined) update.colores = data.colores
    if (data.features !== undefined) update.features = data.features
    if (data.galeria !== undefined) update.galeria = data.galeria

    const doc = await this.model
      .findByIdAndUpdate(
        id,
        { $set: update },
        { returnDocument: "after", runValidators: true }
      )
      .lean()
    return doc ? this.toEntity(doc as VehiculoDocument) : null
  }

  async delete(id: string): Promise<VehiculoEntity | null> {
    const doc = await this.model.findByIdAndDelete(id).lean()
    return doc ? this.toEntity(doc as VehiculoDocument) : null
  }
}
