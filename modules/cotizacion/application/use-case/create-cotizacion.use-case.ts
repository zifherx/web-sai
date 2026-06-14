import {
  CotizacionResponseDTO,
  CreateCotizacionDTO,
} from "@/modules/cotizacion/application/dto/cotizacion.dto"
import { CotizacionMapper } from "@/modules/cotizacion/application/ports/cotizacion.mapper"
import { ICotizacionRepository } from "@/modules/cotizacion/domain/repository/ICotizacionRepository"
import { IClienteUpsertPort } from "@/shared/domain/IClienteUpsertRepository"

/**
 * Caso de uso: Crear una cotización de vehículo.
 *
 * Flujo:
 * 1. Upsert del cliente por `numeroDocumento` — crea o actualiza el registro.
 * 2. Persiste la cotización con los IDs directos (vehiculoId, sedeId).
 *
 * El frontend envía `vehiculoId` y `sedeId` directamente desde el wizard,
 * eliminando las búsquedas por slug que existían en el route legacy.
 *
 * Endpoint PÚBLICO — accesible sin autenticación Clerk.
 * La protección anti-spam se delega al tier "public-write" del rate limiter.
 */
export class CreateCotizacionUseCase {
  constructor(
    private readonly cotizacionRepository: ICotizacionRepository,
    private readonly clienteRepository: IClienteUpsertPort
  ) {}

  async execute(dto: CreateCotizacionDTO): Promise<CotizacionResponseDTO> {
    // 1. Upsert del cliente
    const { cliente } = await this.clienteRepository.upsert({
      name: dto.nombres,
      tipoDocumento: dto.tipoDocumento,
      numeroDocumento: dto.numeroDocumento,
      celular: dto.celular,
      email: dto.email,
      usoDatosPersonales: dto.usoDatosPersonales,
      aceptaPromociones: dto.aceptaPromociones,
    })

    // 2. Persistir la cotización
    const created = await this.cotizacionRepository.create({
      clienteId: cliente.id,
      vehiculoId: dto.vehiculoId,
      sedeId: dto.sedeId,
      ciudad: dto.ciudad,
      intencionCompra: dto.intencionCompra,
    })

    return CotizacionMapper.toDTO(created)
  }
}
