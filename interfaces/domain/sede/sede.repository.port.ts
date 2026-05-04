import { SedeEntity } from "./sede.entity"

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
  // FIX: string[] — el repositorio recibe IDs y Mongoose los guarda como ObjectId.
  //      El populate a IMarcaRef[] ocurre en toEntity() dentro del repository.
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
  create(data: ICreateSedeData): Promise<SedeEntity>
  update(id: string, data: IUpdateSedeData): Promise<SedeEntity | null>
  delete(id: string): Promise<SedeEntity | null>
}
