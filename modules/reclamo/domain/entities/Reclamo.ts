export class ReclamoEntity {
  constructor(
    public readonly id: string,

    // Generales
    public readonly fecha: string,
    public readonly hora: string,
    public readonly numeroReclamo: string,

    // 1. Datos del consumidor
    public readonly tipoDocumento: string,
    public readonly numeroDocumento: string,
    public readonly nombres: string,
    public readonly apellidos: string,
    public readonly email: string,
    public readonly celular: string,
    public readonly departamento: string,
    public readonly provincia: string,
    public readonly distrito: string,
    public readonly direccion: string,

    // 2. Bien adquirido
    public readonly tipoBien: string,
    public readonly vin: string,
    public readonly placa: string,
    public readonly sedeCodexHR: string,
    public readonly sedeCompra: string, // nombre de la sede
    public readonly sedeDireccion: string, // dirección de la sede
    public readonly moneda: string,
    public readonly importeBien: number,
    public readonly descripcionBien: string,

    // 3. Detalle del reclamo
    public readonly tipoSolicitud: string,
    public readonly detalleSolicitud: string,
    public readonly pedidoSolicitud: string,
    public readonly isConforme: boolean,

    // Auditoría
    public readonly razonSocial?: string,
    public readonly rucEmpresa?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  /**
   * Genera la fecha actual en formato local peruano (DD/MM/YYYY).
   */
  static generarFecha(): string {
    return new Date().toLocaleDateString("es-PE")
  }

  /**
   * Genera la hora actual en formato HH:MM (24h).
   */
  static generarHora(): string {
    return new Date().toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  /**
   * Genera el número de reclamo correlativo con el formato:
   *   {CODEX_HR}-{YYYYMMDD}-{CORRELATIVO_4_DIGITOS}
   *
   * @example
   * ReclamoEntity.generarNumeroReclamo("CLUSTER", "15/06/2025", 42)
   * // → "CLUSTER-20250615-0042"
   *
   * @param codexHR      - Código HR de la sede (ej. "CLUSTER")
   * @param fecha        - Fecha en formato DD/MM/YYYY
   * @param correlativo  - Número correlativo ya calculado por el use-case
   *
   * @warning El correlativo se deriva del último reclamo en BD. En escenarios
   * de alta concurrencia, dos requests simultáneos podrían leer el mismo
   * "último" y generar números duplicados. La solución definitiva requiere
   * un contador atómico con `$inc` sobre un documento dedicado en MongoDB.
   */
  static generarNumeroReclamo(
    codexHR: string,
    fecha: string,
    correlativo: number
  ): string {
    const [d, m, y] = fecha.split("/")
    const fechaStr = `${y ?? ""}${m ?? ""}${d ?? ""}`
    const correlativoStr = String(correlativo).padStart(4, "0")
    return `${codexHR.toUpperCase()}-${fechaStr}-${correlativoStr}`
  }
}
