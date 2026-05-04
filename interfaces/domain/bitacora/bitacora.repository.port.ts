import {
  BitacoraEntity,
  IBitacoraRequest,
  IBitacoraResponse,
} from "./bitacora.entity"

export interface ICreateBitacoraData {
  request: IBitacoraRequest
  response: IBitacoraResponse
  method: string
  url: string
}

export interface IBitacoraRepository {
  findAll(): Promise<BitacoraEntity[]>
  create(data: ICreateBitacoraData): Promise<BitacoraEntity>
}
