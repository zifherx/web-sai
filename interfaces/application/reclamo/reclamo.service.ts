import {
  CreateReclamoDTO,
  ReclamoMapper,
  ReclamoResponseDTO,
} from "@/interfaces/application"
import {
  IReclamoRepository,
  ReclamoFilters,
  ReclamoNotFoundError,
  ReclamoValidationError,
} from "@/interfaces/domain"

export class ReclamoService {
  constructor(private readonly repository: IReclamoRepository) {}

  async getAll(filters?: ReclamoFilters): Promise<ReclamoResponseDTO[]> {
    const items = await this.repository.findAll(filters)
    return ReclamoMapper.toDTOList(items)
  }

  async getById(id: string): Promise<ReclamoResponseDTO> {
    if (!id) throw new ReclamoValidationError("El id es requerido")
    const item = await this.repository.findById(id)
    if (!item) throw new ReclamoNotFoundError(id)
    return ReclamoMapper.toDTO(item)
  }

  async create(dto: CreateReclamoDTO): Promise<ReclamoResponseDTO> {
    // Genera fecha y hora si no vienen en el payload
    const now = new Date()
    const fecha = now.toLocaleDateString("es-PE")
    const hora = now.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
    })

    // Genera el número de reclamo correlativo automáticamente
    const numeroReclamo = await this.generarNumeroReclamo(
      dto.sedeCodexHR,
      fecha
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
   * Genera el número de reclamo correlativo con el formato:
   *   {CODEX_HR}-{YYYYMMDD}-{CORRELATIVO_4_DIGITOS}
   *
   * Ejemplo: CLUSTER-20250615-0042
   *
   * El correlativo se obtiene del último reclamo en BD,
   * evitando la llamada al frontend que hacía el legacy.
   */
  private async generarNumeroReclamo(
    codexHR: string,
    fecha: string
  ): Promise<string> {
    const ultimo = await this.repository.findLast()

    let correlativo = 1
    if (ultimo) {
      const partes = ultimo.numeroReclamo.split("-")
      const ultimoNum = parseInt(partes[partes.length - 1], 10)
      if (!isNaN(ultimoNum)) correlativo = ultimoNum + 1
    }

    // Formatea fecha DD/MM/YYYY → YYYYMMDD
    const [d, m, y] = fecha.split("/")
    const fechaStr = `${y ?? ""}${m ?? ""}${d ?? ""}`

    const correlativoStr = String(correlativo).padStart(4, "0")
    return `${codexHR.toUpperCase()}-${fechaStr}-${correlativoStr}`
  }
}
