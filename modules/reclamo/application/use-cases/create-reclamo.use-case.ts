import { ReclamoEntity } from "../../domain/entities/Reclamo"
import { IReclamoRepository } from "../../domain/repositories/IReclamoRepository"
import { CreateReclamoDTO, ReclamoResponseDTO } from "../dtos/reclamo.dto"
import { ReclamoMapper } from "../ports/reclamo.mapper"

/**
 * Caso de uso: Crear un reclamo en el Libro de Reclamaciones.
 *
 * Responsabilidades:
 * 1. Generar fecha, hora y número de reclamo (lógica delegada a la entidad)
 * 2. Calcular el correlativo a partir del último reclamo en BD
 * 3. Normalizar campos opcionales a strings vacíos para consistencia en BD
 * 4. Persistir el reclamo y retornar el DTO
 *
 * Este use-case es invocado desde un endpoint público (sin autenticación Clerk).
 * La protección contra abuso se maneja en el rate-limit tier "public-write".
 */
export class CreateReclamoUseCase {
  constructor(private readonly repository: IReclamoRepository) {}

  async execute(dto: CreateReclamoDTO): Promise<ReclamoResponseDTO> {
    const fecha = ReclamoEntity.generarFecha()
    const hora = ReclamoEntity.generarHora()
    const correlativo = await this.resolverCorrelativo()
    const numeroReclamo = ReclamoEntity.generarNumeroReclamo(
      dto.sedeCodexHR,
      fecha,
      correlativo
    )

    const created = await this.repository.create({
      fecha,
      hora,
      numeroReclamo,
      tipoDocumento: dto.tipoDocumento,
      numeroDocumento: dto.numeroDocumento,
      nombres: dto.nombres,
      apellidos: dto.apellidos,
      email: dto.email ?? "",
      celular: dto.celular ?? "",
      departamento: dto.departamento ?? "",
      provincia: dto.provincia ?? "",
      distrito: dto.distrito ?? "",
      direccion: dto.direccion ?? "",
      tipoBien: dto.tipoBien,
      vin: dto.vin ?? "",
      placa: dto.placa ?? "",
      sedeCodexHR: dto.sedeCodexHR.toUpperCase(),
      sedeCompra: dto.sedeCompra ?? "",
      sedeDireccion: dto.sedeDireccion ?? "",
      moneda: dto.moneda ?? "pen",
      importeBien: dto.importeBien ?? 0,
      descripcionBien: dto.descripcionBien,
      tipoSolicitud: dto.tipoSolicitud,
      detalleSolicitud: dto.detalleSolicitud,
      pedidoSolicitud: dto.pedidoSolicitud,
      isConforme: dto.isConforme,
      razonSocial: dto.razonSocial ?? "",
      rucEmpresa: dto.rucEmpresa ?? "",
    })

    return ReclamoMapper.toDTO(created)
  }

  /**
   * Calcula el próximo correlativo leyendo el último reclamo en BD.
   *
   * @warning Race condition: en alta concurrencia dos requests simultáneos
   * pueden leer el mismo "último" y generar números duplicados.
   * Solución definitiva: contador atómico con `$inc` en MongoDB.
   */
  private async resolverCorrelativo(): Promise<number> {
    const ultimo = await this.repository.findLast()
    if (!ultimo) return 1

    const partes = ultimo.numeroReclamo.split("-")
    const ultimoNum = parseInt(partes[partes.length - 1], 10)
    return isNaN(ultimoNum) ? 1 : ultimoNum + 1
  }
}
