import { CotizacionEntity } from "./cotizacion.entity"

export interface CotizacionFilters {
  from?: string // ISO date string — rango de fechas para el admin
  to?: string
  sedeId?: string
  intencionCompra?: string
}

export interface ICotizacionRepository {
  findAll(filters?: CotizacionFilters): Promise<CotizacionEntity[]>
  findById(id: string): Promise<CotizacionEntity | null>
  create(data: {
    clienteId: string
    vehiculoId: string
    sedeId: string
    ciudad: string
    intencionCompra: string
  }): Promise<CotizacionEntity>
}
