import { ClienteEntity } from "@/modules/cliente/domain/entities/Cliente"

type ClienteData = Omit<ClienteEntity, "id" | "createdAt" | "updatedAt">
type ClienteUpdateData = Partial<
  Omit<ClienteEntity, "id" | "createdAt" | "updatedAt">
>

export interface IClienteRepository {
  findByNumeroDocumento(numeroDocumento: string): Promise<ClienteEntity | null>
  findById(id: string): Promise<ClienteEntity | null>
  create(data: ClienteData): Promise<ClienteEntity>
  update(id: string, data: ClienteUpdateData): Promise<ClienteEntity | null>

  /**
   * upsert — crea el cliente si no existe por numeroDocumento,
   * o actualiza sus datos si ya existe.
   * Retorna la entidad resultante y un flag indicando si fue creado.
   * Encapsula la lógica de negocio que estaba hardcodeada en el route.ts legacy.
   */
  upsert(data: ClienteData): Promise<{
    cliente: ClienteEntity
    isNew: boolean
  }>
}
