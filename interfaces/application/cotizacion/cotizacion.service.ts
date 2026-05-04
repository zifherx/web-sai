import { IClienteRepository } from "@/interfaces/domain/cliente/cliente.repository.port"
import {
  CotizacionNotFoundError,
  CotizacionValidationError,
} from "@/interfaces/domain/cotizacion/cotizacion.errors"
import {
  CotizacionFilters,
  ICotizacionRepository,
} from "@/interfaces/domain/cotizacion/cotizacion.repository.port"
import { CotizacionResponseDTO, CreateCotizacionDTO } from "./cotizacion.dto"
import { CotizacionMapper } from "./cotizacion.mapper"

export class CotizacionService {
  constructor(
    private readonly cotizacionRepo: ICotizacionRepository,
    private readonly clienteRepo: IClienteRepository
  ) {}

  async getAll(filters?: CotizacionFilters): Promise<CotizacionResponseDTO[]> {
    const items = await this.cotizacionRepo.findAll(filters)
    return CotizacionMapper.toDTOList(items)
  }

  async getById(id: string): Promise<CotizacionResponseDTO> {
    if (!id) throw new CotizacionValidationError("El id es requerido")
    const item = await this.cotizacionRepo.findById(id)
    if (!item) throw new CotizacionNotFoundError(id)
    return CotizacionMapper.toDTO(item)
  }

  async create(dto: CreateCotizacionDTO): Promise<CotizacionResponseDTO> {
    /**
     * 1. Upsert del cliente — lógica de negocio que estaba en el route legacy.
     *    Si el cliente ya existe por numeroDocumento → actualiza nombre/celular/email.
     *    Si no existe → lo crea.
     */
    const { cliente } = await this.clienteRepo.upsert({
      name: dto.nombres,
      tipoDocumento: dto.tipoDocumento,
      numeroDocumento: dto.numeroDocumento,
      celular: dto.celular,
      email: dto.email,
      usoDatosPersonales: dto.usoDatosPersonales,
      aceptaPromociones: dto.aceptaPromociones,
    })

    /**
     * 2. Crear la cotización con los IDs directos.
     *
     *    A diferencia del legacy (que buscaba por slugModelo y slugConcesionario),
     *    ahora el frontend envía vehiculoId y sedeId directamente desde el wizard.
     *    Esto elimina 2 queries adicionales de búsqueda por slug.
     */
    const cotizacion = await this.cotizacionRepo.create({
      clienteId: cliente.id,
      vehiculoId: dto.vehiculoId,
      sedeId: dto.sedeId,
      ciudad: dto.ciudad,
      intencionCompra: dto.intencionCompra,
    })

    return CotizacionMapper.toDTO(cotizacion)
  }
}
