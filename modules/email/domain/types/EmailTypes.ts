export interface SendEmailResult {
  success: boolean
  id?: string
  error?: string
}

// ── Parámetros por tipo de email ──────────────────────────────────────────────

export interface SendCitaEmailParams {
  areaEmail: string

  // Cliente
  clienteEmail: string
  clienteNombre: string
  tipoDocumento: string
  numeroDocumento: string
  celular: string

  //Vehiculo
  placa: string
  kilometraje: string
  marcaFlat: string
  modeloFlat: string

  // Servicio
  tipoServicio: string
  comentario: string

  // Sede asignada
  sedeName: string
  sedeCiudad: string
  sedeAddress: string

  // Referencia
  citaId: string
  fechaRegistro: Date
}

export interface SendLeadCorporativoEmailParams {
  areaEmail: string
  razonSocial: string
  ruc: string
  reactTemplate?: React.ReactElement
}

export interface SendReclamoEmailParams {
  clienteEmail?: string
  clienteNombre: string
  numeroDocumento: string
  numeroReclamo: string
  areaEmail: string
  pdfBuffer: Buffer
  reactTemplate?: React.ReactElement
}
