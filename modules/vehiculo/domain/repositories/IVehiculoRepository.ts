import {
  IColorVehicle,
  IFeatures,
  IGalleryVehicle,
  VehiculoEntity,
} from "@/modules/vehiculo/domain/entities/Vehiculo"

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

export interface ICreateVehiculoData {
  name: string
  slug: string
  codigoFlashdealer: string
  imageUrl: string
  precioBase: number
  fichaTecnica: string
  marcaId: string
  carroceriaId: string
  isEntrega48H: boolean
  isGLP: boolean
  isLiquidacion: boolean
  isNuevo: boolean
  isActive: boolean
  colores: IColorVehicle[]
  features: IFeatures
  galeria: IGalleryVehicle[]
  createdBy: string
}

export interface IUpdateVehiculoData {
  name?: string
  slug?: string
  codigoFlashdealer?: string
  imageUrl?: string
  precioBase?: number
  fichaTecnica?: string
  marcaId?: string
  carroceriaId?: string
  isEntrega48H?: boolean
  isGLP?: boolean
  isLiquidacion?: boolean
  isNuevo?: boolean
  isActive?: boolean
  colores?: IColorVehicle[]
  features?: IFeatures
  galeria?: IGalleryVehicle[]
}

export interface IVehiculoRepository {
  findAll(filters?: VehiculoFilters): Promise<VehiculoEntity[]>
  findById(id: string): Promise<VehiculoEntity | null>
  findBySlug(slug: string): Promise<VehiculoEntity | null>
  findActive(
    filters?: Omit<VehiculoFilters, "isActive">
  ): Promise<VehiculoEntity[]>
  findByMarca(marcaId: string): Promise<VehiculoEntity[]>
  create(data: ICreateVehiculoData): Promise<VehiculoEntity>
  update(id: string, data: IUpdateVehiculoData): Promise<VehiculoEntity | null>
  delete(id: string): Promise<VehiculoEntity | null>
}
