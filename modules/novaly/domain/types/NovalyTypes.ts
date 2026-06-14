/**
 * Forma que el frontend envía al backend de WEB-SAI.
 * Validado por `NovalyPayloadSchema` en la capa de application.
 */
export interface NovalyRequest {
  nombreCompleto: string
  correoElectronico: string
  numeroCelular: string
  tipoDocumento?: string
  numeroDocumento?: string
  marcaVehiculo?: string
  modeloVehiculo?: string
  ciudadCotizacion?: string
  idMarca?: number
  idTienda?: number
  utmTrafico?: string
}

/**
 * Forma exacta que la API externa de Novaly espera recibir.
 * Definida aquí en el dominio porque es el contrato con el servicio externo.
 */
export interface NovalyPayload {
  nombres: string
  apellidos: string
  celular: string
  email: string
  tipo_documento: string
  numero_documento: string
  ciudad_origen: string
  marca: string
  modelo: string
  id_marca: number
  id_tienda: number
  form_name: string
  city: string
  utm: string
}

/** Respuesta normalizada que retorna el puerto tras enviar el lead */
export interface NovalyLeadResult {
  success: boolean
  message: string
  raw?: unknown
}
