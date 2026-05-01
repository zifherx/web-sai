export interface APIResponse<T = unknown> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface APIError {
  message: string
  code: string
  statusCode: number
}

export interface PortadaType {
  id: string
  name: string
  slug: string
  imageUrl: string
  isActive: boolean
  createdBy: string
  createdAt?: string
  updatedAt?: string
}

export interface MarcaType {
  id: string
  name: string
  slug: string
  imageUrl: string
  idNovaly: number
  isActive: boolean
  createdBy: string
  createdAt?: string
  updatedAt?: string
}

export interface CarroceriaType {
  id: string
  name: string
  slug: string
  isActive: boolean
  createdBy: string
  createdAt?: string
  updatedAt?: string
}

export interface ICoordenadasMapa {
  latitud: string
  longitud: string
}

export interface SedeType {
  id: string
  name: string
  slug: string
  idTiendaNovaly: number
  codexHR: string
  imageUrl: string
  ciudad: string
  address: string
  scheduleRegular: string
  scheduleExtended: string
  linkHowArrived: string
  marcasDisponiblesVentas: string[]
  marcasDisponiblesTaller: string[]
  coordenadasMapa: ICoordenadasMapa
  celularCitas: string
  isTaller: boolean
  isActive: boolean
  createdBy: string
  createdAt?: string
  updatedAt?: string
}

export interface IColor {
  label: string
  hex: string
  carColor: string
  isActive: boolean
}

export interface IFeature {
  superTitle: string
  mainTitle: string
  subTitle?: string
}

export interface IFeatures {
  feature1: IFeature[]
  feature2: IFeature[]
}

export interface IGaleriaItem {
  name: string
  imageUrl: string
}

export interface VehiculoType {
  id: string
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
  colores: IColor[]
  features: IFeatures
  galeria: IGaleriaItem[]
  createdBy: string
  createdAt?: string
  updatedAt?: string
}

export interface IVehiculoFilters {
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

export interface ISedeFilters {
  ciudad?: string
  isActive?: boolean
  isTaller?: boolean
  marcaVentaId?: string
  marcaTallerId?: string
}

export interface ICarroceriaFilters {
  isActive?: boolean
}
