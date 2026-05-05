import { CitaEntity } from "@/interfaces/domain"

export interface CitaFilters {
  sedeId?: string
  tipoServicio?: string
  from?: string
  to?: string
}

export interface ICreateCitaData {
  clienteId: string
  placa: string
  kilometraje: string
  marcaId: string
  modeloId: string
  marcaFlat: string
  modeloFlat: string
  sedeId: string
  ciudadSede: string
  tipoServicio: string
  comentario: string
  whatsappMessage: string
  whatsappContact: string
}

export interface ICitaRepository {
  findAll(filters?: CitaFilters): Promise<CitaEntity[]>
  findById(id: string): Promise<CitaEntity | null>
  create(data: ICreateCitaData): Promise<CitaEntity>
}
