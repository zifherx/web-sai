import { z } from "zod"

const ColorSchema = z.object({
  label: z.string().min(3, "Label es requerido"),
  hex: z.string().regex(/^#[0-9A-F]{6}$/i, "Código hex inválido"),
  carColor: z.string(),
  isActive: z.boolean().default(true),
})

const FeatureSchema = z.object({
  superTitle: z.string().min(1, "SuperTitle es requerido"),
  mainTitle: z.string().min(1, "MainTitle es requerido"),
  subTitle: z.string().min(1, "Subtitle es requerido"),
})

const GaleriaItemSchema = z.object({
  name: z.string().min(3, "Alt de imagen es requerido"),
  imageUrl: z.url("Debe ser una URL válida"),
})

export const CreateVehiculoSchema = z.object({
  name: z
    .string({ error: "El nombre es requerido" })
    .min(2, "Mínimo 2 caracteres")
    .max(100)
    .trim(),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Solo minúsculas, número y guiones"),
  codigoFlashdealer: z.string().min(2, "Código requerido"),
  imageUrl: z.string().url("Debe ser una URL válida"),
  precioBase: z.number().min(0, "El precio no puede ser negativo"),
  fichaTecnica: z.url("Debe ser una URL válida").or(z.literal("")),
  marcaId: z.string().min(24, "ID de marca inválido").max(24),
  carroceriaId: z.string().min(24, "ID de carrocería inválido").max(24),
  isEntrega48H: z.boolean(),
  isGLP: z.boolean(),
  isLiquidacion: z.boolean().default(false),
  isNuevo: z.boolean().default(false),
  isActive: z.boolean().default(true),
  colores: z.array(ColorSchema).min(1, "Debe tener al menos 1 color"),
  features: z.object({
    feature1: z.array(FeatureSchema),
    feature2: z.array(FeatureSchema),
  }),
  galeria: z.array(GaleriaItemSchema),
})

export const UpdateVehiculoSchema = CreateVehiculoSchema.partial()

export const VehiculoIdSchena = z.object({
  vehiculoId: z.string().length(24, "ID de MongoDB inválido"),
})

export const VehiculoFiltersSchema = z.object({
  marcaId: z.string().optional(),
  carroceriaId: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  isNuevo: z.coerce.boolean().optional(),
  isGLP: z.coerce.boolean().optional(),
  isLiquidacion: z.coerce.boolean().optional(),
  isEntrega48H: z.coerce.boolean().optional(),
  precioMin: z.coerce.number().optional(),
  precioMax: z.coerce.number().optional(),
  slug: z.string().optional(),
})

export type CreateVehiculoDTO = z.infer<typeof CreateVehiculoSchema>
export type UpdateVehiculoDTO = z.infer<typeof UpdateVehiculoSchema>
export type VehiculoFiltersDTO = z.infer<typeof VehiculoFiltersSchema>

export type ColorResponseDTO = {
  label: string
  hex: string
  carColor: string
  isActive: boolean
}

export type FeatureResponseDTO = {
  superTitle: string
  mainTitle: string
  subTitle?: string
}

export type GaleriaItemResponseDTO = {
  name: string
  imageUrl: string
}

export type VehiculoResponseDTO = {
  id: string
  name: string
  slug: string
  codigoFlashdealer: string
  imageUrl: string
  precioBase: number
  fichaTecnica: string
  marcaId: string
  carroceriaId: string
  isEntrega48H: boolean
  isGLP: boolean
  isLiquidacion: boolean
  isNuevo: boolean
  isActive: boolean
  colores: ColorResponseDTO[]
  features: {
    feature1: FeatureResponseDTO[]
    feature2: FeatureResponseDTO[]
  }
  galeria: GaleriaItemResponseDTO[]
  createdBy: string
  createdAt?: string
  updatedAt?: string
}
