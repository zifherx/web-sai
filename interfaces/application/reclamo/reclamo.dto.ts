import { z } from "zod"

export const CreateReclamoSchema = z.object({
  // 1. Consumidor
  tipoDocumento: z.string().min(1, "El tipo de documento es requerido"),
  numeroDocumento: z.string().min(8).max(15),
  nombres: z.string().min(2),
  apellidos: z.string().min(2),
  email: z.string().optional().default(""),
  celular: z.string().optional().default(""),
  departamento: z.string().optional().default(""),
  provincia: z.string().optional().default(""),
  distrito: z.string().optional().default(""),
  direccion: z.string().optional().default(""),

  // 2. Bien
  tipoBien: z.string().min(1, "El tipo de bien es requerido"),
  vin: z.string().optional().default(""),
  placa: z.string().optional().default(""),
  sedeCodexHR: z.string().min(1, "La sede es requerida"),
  sedeCompra: z.string().optional().default(""),
  sedeDireccion: z.string().optional().default(""),
  moneda: z.string().optional().default("pen"),
  importeBien: z.coerce.number().min(0).default(0),
  descripcionBien: z.string().min(1).max(220),

  // 3. Reclamo
  tipoSolicitud: z.string().min(1),
  detalleSolicitud: z.string().min(10).max(500),
  pedidoSolicitud: z.string().min(10).max(500),
  isConforme: z.boolean(),

  // Generales
  razonSocial: z.string().optional(),
  rucEmpresa: z.string().optional(),
})

export type CreateReclamoDTO = z.infer<typeof CreateReclamoSchema>

// ─── DTO de respuesta ─────────────────────────────────────────

export type ReclamoResponseDTO = {
  // Generado por el BE
  id: string
  fecha: string
  hora: string
  numeroReclamo: string
  createdAt?: string
  updatedAt?: string

  // Consumidor
  nombres: string
  apellidos: string
  departamento: string
  provincia: string
  distrito: string
  direccion: string
  tipoDocumento: string
  numeroDocumento: string
  email?: string
  celular: string

  // Sede
  sedeCodexHR: string
  sedeCompra: string
  sedeDireccion: string

  // Bien
  tipoBien: string
  vin: string
  placa: string
  descripcionBien: string
  moneda: string
  importeBien: number

  // Reclamo
  tipoSolicitud: string
  detalleSolicitud: string
  pedidoSolicitud: string
  isConforme: boolean

  // Datos de la empresa
  razonSocial?: string
  rucEmpresa?: string
}
