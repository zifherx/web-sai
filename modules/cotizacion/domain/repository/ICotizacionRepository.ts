import { CotizacionEntity } from "@/modules/cotizacion/domain/entities/Cotizacion"

export interface CotizacionFilters {
  from?: string // ISO date string — rango de fechas para el admin
  to?: string
  sedeId?: string
  intencionCompra?: string
  // Filtros de campaña para análisis en el CMS
  utmSource?: string
  utmCampaign?: string
}

export interface ICreateCotizacionData {
  clienteId: string
  vehiculoId: string
  sedeId: string
  ciudad: string
  intencionCompra: string
  // UTM opcionales — se persisten como string vacío si no vienen del frontend
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  urlCampana?: string
}

export interface ICotizacionRepository {
  findAll(filters?: CotizacionFilters): Promise<CotizacionEntity[]>
  findById(id: string): Promise<CotizacionEntity | null>
  create(data: ICreateCotizacionData): Promise<CotizacionEntity>
}
