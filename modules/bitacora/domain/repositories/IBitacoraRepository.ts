import {
  BitacoraEntity,
  IBitacoraRequest,
  IBitacoraResponse,
} from "@/modules/bitacora/domain/entitites/Bitacora"

export interface ICreateBitacoraData {
  request: IBitacoraRequest
  response: IBitacoraResponse
  method: string
  url: string
}

export interface BitacoraFilters {
  /** ISO date string — inicio del rango de auditoría */
  from?: string
  /** ISO date string — fin del rango de auditoría */
  to?: string
  /** Filtrar por código de respuesta HTTP (ej: 200, 400, 500) */
  responseCode?: number
}

export interface IBitacoraRepository {
  findAll(filters?: BitacoraFilters): Promise<BitacoraEntity[]>
  create(data: ICreateBitacoraData): Promise<BitacoraEntity>
}

export interface IBitacoraLogPort {
  logSuccess(
    responseBody: string,
    status: number,
    statusText: string,
    method: string,
    url: string,
    requestPayload: unknown,
    authorization?: string
  ): Promise<void>
  logError(
    status: number,
    statusText: string,
    errorBody: string,
    method: string,
    url: string,
    requestPayload: unknown,
    authorization?: string
  ): Promise<void>
  logValidationError(
    requestData: unknown,
    errorResponse: unknown,
    url: string
  ): Promise<void>
  logGenericError(
    requestData: unknown,
    errorResponse: unknown,
    errorMessage: string,
    url: string
  ): Promise<void>
}
