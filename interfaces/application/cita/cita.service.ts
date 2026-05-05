import {
  CitaMapper,
  CitaResponseDTO,
  CreateCitaDTO,
} from "@/interfaces/application"
import {
  CitaFilters,
  CitaNotFoundError,
  CitaValidationError,
  ICitaRepository,
  IClienteRepository,
} from "@/interfaces/domain"

export class CitaService {
  constructor(
    private readonly citaRepo: ICitaRepository,
    private readonly clienteRepo: IClienteRepository
  ) {}

  async getAll(filters?: CitaFilters): Promise<CitaResponseDTO[]> {
    const items = await this.citaRepo.findAll(filters)
    return CitaMapper.toDTOList(items)
  }

  async getById(id: string): Promise<CitaResponseDTO> {
    if (!id) throw new CitaValidationError("El id es requerido")
    const item = await this.citaRepo.findById(id)
    if (!item) throw new CitaNotFoundError(id)
    return CitaMapper.toDTO(item)
  }

  async create(dto: CreateCitaDTO): Promise<CitaResponseDTO> {
    /**
     * 1. Upsert del cliente — igual que en CotizacionService.
     *    El formulario de cita recoge los datos del cliente,
     *    el backend los persiste con upsert por numeroDocumento.
     */
    const { cliente } = await this.clienteRepo.upsert({
      name: dto.nombres,
      tipoDocumento: dto.tipoDocumento,
      numeroDocumento: dto.numeroDocumento,
      celular: dto.celular,
      email: dto.email,
      usoDatosPersonales: true,
      aceptaPromociones: false,
    })

    /**
     * 2. Genera el mensaje de WhatsApp automáticamente.
     *    El legacy generaba esto en el frontend — movido al service
     *    para mantener la lógica de negocio centralizada.
     *
     *    Formato:
     *    "Hola, soy [nombre], quisiera agendar un servicio de [tipo]
     *     para mi vehículo [marca] [placa] con [km] km.
     *     Ciudad: [ciudad]. Comentario: [comentario]"
     */
    const whatsappMessage = this.buildWhatsappMessage({
      nombre: dto.nombres,
      marca: dto.marcaFlat,
      placa: dto.placa,
      kilometraje: dto.kilometraje,
      tipoServicio: dto.tipoServicio,
      ciudadSede: dto.ciudadSede,
      comentario: dto.comentario,
    })

    /**
     * 3. El contacto de WhatsApp viene del celularCitas de la sede.
     *    Por ahora se deja vacío — el frontend puede enriquecerlo
     *    si tiene el dato de la sede, o el admin lo configura.
     *    TODO: buscar sede por sedeId y extraer celularCitas
     */
    const whatsappContact = ""

    /**
     * 4. Crear la cita con todos los datos procesados.
     */
    const cita = await this.citaRepo.create({
      clienteId: cliente.id,
      placa: dto.placa.toUpperCase(),
      kilometraje: dto.kilometraje,
      marcaId: dto.marcaId,
      modeloId: dto.modeloId,
      marcaFlat: dto.marcaFlat,
      modeloFlat: dto.modeloFlat,
      sedeId: dto.sedeId,
      ciudadSede: dto.ciudadSede,
      tipoServicio: dto.tipoServicio,
      comentario: dto.comentario,
      whatsappMessage,
      whatsappContact,
    })

    return CitaMapper.toDTO(cita)
  }

  // ── Helpers privados ────────────────────────────────────────

  private buildWhatsappMessage(params: {
    nombre: string
    marca: string
    placa: string
    kilometraje: string
    tipoServicio: string
    ciudadSede: string
    comentario: string
  }): string {
    const lines = [
      `Hola, soy ${params.nombre}.`,
      `Quisiera agendar un servicio de *${params.tipoServicio}*.`,
      `Vehículo: *${params.marca}* | Placa: *${params.placa.toUpperCase()}* | ${params.kilometraje} km`,
      `Ciudad: ${params.ciudadSede}`,
    ]
    if (params.comentario) {
      lines.push(`Comentario: ${params.comentario}`)
    }
    return lines.join("\n")
  }
}
