import { ReclamoEntity } from "@/modules/reclamo/domain/entities/Reclamo"

export interface ReclamoFilters {
  tipoSolicitud?: string // "reclamo" | "queja"
  sedeCodexHR?: string
  fecha?: string
}

export interface ICreateReclamoData {
  fecha: string
  hora: string
  numeroReclamo: string
  tipoDocumento: string
  numeroDocumento: string
  nombres: string
  apellidos: string
  email: string
  celular: string
  departamento: string
  provincia: string
  distrito: string
  direccion: string
  tipoBien: string
  vin: string
  placa: string
  sedeCodexHR: string
  sedeCompra: string
  sedeDireccion: string
  moneda: string
  importeBien: number
  descripcionBien: string
  tipoSolicitud: string
  detalleSolicitud: string
  pedidoSolicitud: string
  isConforme: boolean
  razonSocial: string
  rucEmpresa: string
}

export interface IReclamoRepository {
  findAll(filters?: ReclamoFilters): Promise<ReclamoEntity[]>
  findById(id: string): Promise<ReclamoEntity | null>
  findLast(): Promise<ReclamoEntity | null>
  create(data: ICreateReclamoData): Promise<ReclamoEntity>
}
