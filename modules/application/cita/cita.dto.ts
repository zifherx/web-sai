import { z } from "zod"

// ─── Schema de entrada (backend) ─────────────────────────────

export const CreateCitaSchema = z.object({
  // Datos del cliente (upsert por numeroDocumento)
  nombres: z.string().min(2, "El nombre es requerido"),
  tipoDocumento: z.string().min(1, "El tipo de documento es requerido"),
  numeroDocumento: z.string().min(8).max(15),
  celular: z.string().regex(/^9\d{8}$/, "Celular inválido"),
  email: z.string().email("Email inválido"),

  // Vehículo
  placa: z.string().min(1, "La placa es requerida"),
  kilometraje: z.string().min(1, "El kilometraje es requerido"),

  /**
   * IDs directos — el frontend los envía desde los selects.
   * marcaId y modeloId reemplazan la búsqueda por slug del legacy.
   */
  marcaId: z.string().length(24, "ID de marca inválido"),
  modeloId: z.string().optional().default(""), // opcional si es servicio sin modelo
  marcaFlat: z.string().min(1, "La marca es requerida"),
  modeloFlat: z.string().optional().default(""),

  // Servicio
  sedeId: z.string().length(24, "ID de sede inválido"),
  ciudadSede: z.string().min(1, "La ciudad es requerida"),
  tipoServicio: z.string().min(1, "El tipo de servicio es requerido"),
  comentario: z.string().optional().default(""),
})

export type CreateCitaDTO = z.infer<typeof CreateCitaSchema>

// ─── Filtros GET ──────────────────────────────────────────────

export const CitaFiltersSchema = z.object({
  sedeId: z.string().optional(),
  tipoServicio: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
})

export type CitaFiltersDTO = z.infer<typeof CitaFiltersSchema>

// ─── DTO de respuesta ─────────────────────────────────────────

export type CitaResponseDTO = {
  id: string
  clienteId: string
  placa: string
  kilometraje: string
  marcaId: string
  modeloId: string
  marcaFlat: string
  modeloFlat: string
  sedeId: string
  ciudadSede: string
  tipoServicio: string
  comentario: string
  whatsappMessage: string
  whatsappContact: string
  // Populated — solo en lecturas
  cliente?: {
    id: string
    name: string
    tipoDocumento: string
    numeroDocumento: string
    celular: string
    email: string
  }
  marca?: {
    id: string
    name: string
    slug: string
    imageUrl: string
  }
  modelo?: {
    id: string
    name: string
    slug: string
    imageUrl: string
  }
  concesionario?: {
    id: string
    name: string
    ciudad: string
    codexHR: string
    address: string
    celularCitas: string
  }
  createdAt?: string
  updatedAt?: string
}
