import { ClienteEntity } from "@/interfaces/domain"

export interface IClienteRepository {
  findByNumeroDocumento(numeroDocumento: string): Promise<ClienteEntity | null>
  findById(id: string): Promise<ClienteEntity | null>
  create(
    data: Omit<ClienteEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<ClienteEntity>
  update(
    id: string,
    data: Partial<ClienteEntity>
  ): Promise<ClienteEntity | null>

  /**
   * upsert — crea el cliente si no existe por numeroDocumento,
   * o actualiza sus datos si ya existe.
   * Retorna la entidad resultante y un flag indicando si fue creado.
   * Encapsula la lógica de negocio que estaba hardcodeada en el route.ts legacy.
   */
  upsert(data: Omit<ClienteEntity, "id" | "createdAt" | "updatedAt">): Promise<{
    cliente: ClienteEntity
    isNew: boolean
  }>
}
