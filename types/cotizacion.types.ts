export interface CotizacionType {
  // Datos del cliente (backend hace upsert por numeroDocumento)
  nombres: string
  tipoDocumento: string
  numeroDocumento: string
  celular: string
  email: string
  usoDatosPersonales: boolean
  aceptaPromociones: boolean

  // Datos de la cotización (IDs directos — ya no slugs como en el legacy)
  vehiculoId: string
  sedeId: string
  ciudad: string
  intencionCompra: string
  // [NUEVO] UTMs granulares
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  urlCampana?: string
}

export interface CotizacionResponseType {
  id: string
  clienteId: string
  vehiculoId: string
  sedeId: string
  ciudad: string
  intencionCompra: string
  createdAt?: string
}

export interface ICreateCotizacionOption {
  onSuccess?: (data: CotizacionResponseType) => void
  onError?: (err: Error) => void
  onNovalySync?: (result: { success: boolean; error?: string }) => void
}

export interface NovalyPayload {
  nombreCompleto: string
  correoElectronico: string
  numeroCelular: string
  tipoDocumento?: string
  numeroDocumento?: string
  ciudadCotizacion?: string
  vehiculoId?: string
  sedeId?: string
  idTienda?: number
  idMarca?: number
  utmSource?: string
}

export interface SendToNovalyParams {
  // Requeridos por Novaly (camposFaltantes si faltan)
  nombreCompleto: string
  correoElectronico: string
  numeroCelular: string
  // Opcionales pero recomendados
  tipoDocumento?: string
  numeroDocumento?: string
  marcaVehiculo?: string // ← marca del vehículo (nombre, no slug)
  modeloVehiculo?: string // ← modelo del vehículo (nombre)
  ciudadCotizacion?: string
  idMarca?: number // ← idNovaly de la marca
  idTienda?: number // ← idTiendaNovaly de la sede
  utmTrafico?: string
  // [NUEVO] UTMs granulares
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
}

export interface CotizacionEnrichedMeta {
  marcaNombre: string // nombre de la marca para Novaly (ej: "Changan")
  vehiculoNombre: string // nombre del modelo para Novaly (ej: "SUV X7 Plus")
  idMarca: number // idNovaly de la marca
  idTienda: number // idTiendaNovaly de la sede
  utm?: string
  // [NUEVO] UTMs granulares de campañas de marketing digital
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
}
