import { ClienteEntity } from "@/interfaces/domain/cliente/cliente.entity"
import { IClienteRepository } from "@/interfaces/domain/cliente/cliente.repository.port"
import { Model } from "mongoose"
import { ClienteDocument } from "./cliente.schema"

export class MongooseClienteRepository implements IClienteRepository {
  constructor(private readonly model: Model<ClienteDocument>) {}

  private toEntity(doc: ClienteDocument): ClienteEntity {
    return new ClienteEntity(
      (doc._id as any).toString(),
      doc.name,
      doc.tipoDocumento,
      doc.numeroDocumento,
      doc.celular,
      doc.email,
      doc.usoDatosPersonales,
      doc.aceptaPromociones,
      doc.createdAt,
      doc.updatedAt
    )
  }

  async findByNumeroDocumento(
    numeroDocumento: string
  ): Promise<ClienteEntity | null> {
    const doc = await this.model.findOne({ numeroDocumento }).lean()
    return doc ? this.toEntity(doc as ClienteDocument) : null
  }

  async findById(id: string): Promise<ClienteEntity | null> {
    const doc = await this.model.findById(id).lean()
    return doc ? this.toEntity(doc as ClienteDocument) : null
  }

  async create(
    data: Omit<ClienteEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<ClienteEntity> {
    const doc = await this.model.create({
      name: data.name,
      tipoDocumento: data.tipoDocumento,
      numeroDocumento: data.numeroDocumento,
      celular: data.celular,
      email: data.email,
      usoDatosPersonales: data.usoDatosPersonales,
      aceptaPromociones: data.aceptaPromociones,
    })
    return this.toEntity(doc)
  }

  async update(
    id: string,
    data: Partial<ClienteEntity>
  ): Promise<ClienteEntity | null> {
    const update: Record<string, unknown> = {}
    if (data.name !== undefined) update.name = data.name
    if (data.celular !== undefined) update.celular = data.celular
    if (data.email !== undefined) update.email = data.email
    if (data.usoDatosPersonales !== undefined)
      update.usoDatosPersonales = data.usoDatosPersonales
    if (data.aceptaPromociones !== undefined)
      update.aceptaPromociones = data.aceptaPromociones

    const doc = await this.model
      .findByIdAndUpdate(
        id,
        { $set: update },
        { new: true, runValidators: true }
      )
      .lean()
    return doc ? this.toEntity(doc as ClienteDocument) : null
  }

  /**
   * upsert — encapsula la lógica legacy del route.ts:
   *   1. Busca por numeroDocumento
   *   2. Si no existe → create
   *   3. Si existe    → update (nombre, celular, email, checkboxes)
   *
   * Movido del route al repositorio porque es lógica de acceso a datos,
   * no de presentación.
   */
  async upsert(
    data: Omit<ClienteEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<{ cliente: ClienteEntity; isNew: boolean }> {
    const existing = await this.findByNumeroDocumento(data.numeroDocumento)

    if (!existing) {
      const cliente = await this.create(data)
      return { cliente, isNew: true }
    }

    const updated = await this.update(existing.id, {
      name: data.name,
      celular: data.celular,
      email: data.email,
      usoDatosPersonales: data.usoDatosPersonales,
      aceptaPromociones: data.aceptaPromociones,
    })

    return { cliente: updated!, isNew: false }
  }
}
