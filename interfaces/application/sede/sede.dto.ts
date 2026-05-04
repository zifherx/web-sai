import type { IMarcaRef } from "@/types"
import z from "zod"

const CoordenadasSchema = z.object({
  latitud: z.string().min(1, "Latitud es requerida"),
  longitud: z.string().min(1, "Longitud es requerida"),
})

export const CreateSedeSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").trim(),
  slug: z
    .string()
    .min(1, "El slug es requerido")
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  idTiendaNovaly: z.coerce.number().min(0).max(15, "No puede exceder 15"),
  codexHR: z.string().min(3, "Debe tener al menos 3 caracteres").toLowerCase(),
  imageUrl: z.string().url("Debe ser una URL válida").or(z.literal("")),
  ciudad: z.string().min(1, "La ciudad es requerida"),
  address: z.string().min(1, "La dirección es requerida"),
  scheduleRegular: z.string().min(1, "El horario regular es requerido"),
  scheduleExtended: z.string().min(1, "El horario extendido es requerido"),
  linkHowArrived: z.string().url("Debe ser una URL válida"),
  coordenadasMapa: CoordenadasSchema,
  celularCitas: z.string().default(""),
  isTaller: z.boolean().default(false),
  isActive: z.boolean().default(true),
  marcasDisponiblesVentas: z
    .array(z.string().length(24, "ID de marca inválido"))
    .default([]),
  marcasDisponiblesTaller: z
    .array(z.string().length(24, "ID de marca inválido"))
    .default([]),
})

export const UpdateSedeSchema = CreateSedeSchema.partial()

export const SedeIdSchema = z.object({
  sedeId: z.string().length(24, "ID de MongoDB inválido"),
})

export const SedeFiltersSchema = z.object({
  ciudad: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  isTaller: z.coerce.boolean().optional(),
  marcaVentaId: z.string().optional(),
  marcaTallerId: z.string().optional(),
})

export type CreateSedeDTO = z.infer<typeof CreateSedeSchema>
export type UpdateSedeDTO = z.infer<typeof UpdateSedeSchema>
export type SedeFiltersDTO = z.infer<typeof SedeFiltersSchema>

export type CoordenadasResponseDTO = {
  latitud: string
  longitud: string
}

export type SedeResponseDTO = {
  id: string
  name: string
  slug: string
  idTiendaNovaly: number
  codexHR: string
  imageUrl: string
  ciudad: string
  address: string
  scheduleRegular: string
  scheduleExtended: string
  linkHowArrived: string
  /** IDs de marcas como strings */
  marcasDisponiblesVentas: IMarcaRef[]
  marcasDisponiblesTaller: IMarcaRef[]
  coordenadasMapa: CoordenadasResponseDTO
  celularCitas: string
  isTaller: boolean
  isActive: boolean
  createdBy: string
  createdAt?: string
  updatedAt?: string
}
