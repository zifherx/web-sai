import { z } from "zod"

// ─── Schema de entrada ────────────────────────────────────────

export const CreateCotizacionSchema = z.object({
  // Datos del cliente (para upsert)
  nombres: z.string().min(2, "Nombre requerido"),
  tipoDocumento: z.string().min(1, "Tipo de documento requerido"),
  numeroDocumento: z.string().min(8).max(15),
  celular: z.string().regex(/^9\d{8}$/, "Celular inválido"),
  email: z.string().email("Email inválido"),
  usoDatosPersonales: z.boolean().default(false),
  aceptaPromociones: z.boolean().default(false),

  // Datos de la cotización
  vehiculoId: z.string().length(24, "ID de vehículo inválido"),
  sedeId: z.string().length(24, "ID de sede inválido"),
  ciudad: z.string().min(1, "La ciudad es requerida"),
  intencionCompra: z.string().min(1, "La intención de compra es requerida"),
})

export type CreateCotizacionDTO = z.infer<typeof CreateCotizacionSchema>

// ─── Filtros GET ──────────────────────────────────────────────

export const CotizacionFiltersSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  sedeId: z.string().optional(),
  intencionCompra: z.string().optional(),
})

export type CotizacionFiltersDTO = z.infer<typeof CotizacionFiltersSchema>

// ─── DTO de respuesta ─────────────────────────────────────────

export type CotizacionResponseDTO = {
  id: string
  clienteId: string
  vehiculoId: string
  sedeId: string
  ciudad: string
  intencionCompra: string
  // Populated — presentes en las lecturas
  cliente?: {
    id: string
    name: string
    tipoDocumento: string
    numeroDocumento: string
    celular: string
    email: string
  }
  vehiculo?: {
    id: string
    name: string
    slug: string
    imageUrl: string
    precioBase: number
    marca: string
  }
  sede?: {
    id: string
    name: string
    ciudad: string
    codexHR: string
  }
  createdAt?: string
  updatedAt?: string
}
