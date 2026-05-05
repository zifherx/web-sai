import { SedeEntity } from "@/interfaces/domain"

export interface SedeFilters {
  ciudad?: string
  isActive?: boolean
  isTaller?: boolean
  marcaVentaId?: string
  marcaTallerId?: string
}

export interface ICreateSedeData {
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
  coordenadasMapa: {
    latitud: string
    longitud: string
  }
  celularCitas: string
  isTaller: boolean
  isActive: boolean
  createdBy: string
}

export interface IUpdateSedeData extends Partial<ICreateSedeData> {}

export interface ISedeRepository {
  findAll(filters?: SedeFilters): Promise<SedeEntity[]>
  findById(id: string): Promise<SedeEntity | null>
  findBySlug(slug: string): Promise<SedeEntity | null>
  findActive(filters?: Omit<SedeFilters, "isActive">): Promise<SedeEntity[]>
  findByCiudad(ciudad: string): Promise<SedeEntity[]>
  findTalleres(): Promise<SedeEntity[]>
  findByMarcaVentas(marcaId: string): Promise<SedeEntity[]>
  create(data: ICreateSedeData): Promise<SedeEntity>
  update(id: string, data: IUpdateSedeData): Promise<SedeEntity | null>
  delete(id: string): Promise<SedeEntity | null>
}
