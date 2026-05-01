import { VehiculoEntity } from "./vehiculo.entity"

export interface VehiculoFilters {
  marcaId?: string
  carroceriaId?: string
  isActive?: boolean
  isNuevo?: boolean
  isGLP?: boolean
  isLiquidacion?: boolean
  isEntrega48H?: boolean
  precioMin?: number
  precioMax?: number
  slug?: string
}

export interface IVehiculoRepository {
  findAll(filters?: VehiculoFilters): Promise<VehiculoEntity[]>
  findById(id: string): Promise<VehiculoEntity | null>
  findBySlug(slug: string): Promise<VehiculoEntity | null>
  findActive(
    filters?: Omit<VehiculoFilters, "isActive">
  ): Promise<VehiculoEntity[]>
  findByMarca(marcaId: string): Promise<VehiculoEntity[]>
  create(
    data: Omit<
      VehiculoEntity,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "isPublishable"
      | "hasAvailableColors"
      | "hasGallery"
    >
  ): Promise<VehiculoEntity>
  update(
    id: string,
    data: Partial<VehiculoEntity>
  ): Promise<VehiculoEntity | null>
  delete(id: string): Promise<VehiculoEntity | null>
}
