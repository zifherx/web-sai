export interface SendEmailResult {
  success: boolean
  id?: string
  error?: string
}

// ── Parámetros por tipo de email ──────────────────────────────────────────────

export interface SendCitaEmailParams {
  clienteEmail: string
  clienteNombre: string
  numeroDocumento: string
  areaEmail: string
  reactTemplate?: React.ReactElement
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
