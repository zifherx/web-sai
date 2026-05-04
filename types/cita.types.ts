// ─── types/cita.types.ts ──────────────────────────────────────

export interface CitaType {
  // Cliente
  nombres: string
  tipoDocumento: string
  numeroDocumento: string
  celular: string
  email: string

  // Vehículo
  placa: string
  kilometraje: string
  marcaId: string
  modeloId?: string
  marcaFlat: string
  modeloFlat?: string

  // Servicio
  sedeId: string
  ciudadSede: string
  tipoServicio: string
  comentario?: string
}

export interface CitaResponseType {
  id: string
  clienteId: string
  placa: string
  tipoServicio: string
  ciudadSede: string
  whatsappMessage: string
  whatsappContact: string
  createdAt?: string
}

export interface ICreateCitaOption {
  onSuccess?: (data: CitaResponseType) => void
  onError?: (err: Error) => void
}
