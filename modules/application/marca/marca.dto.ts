import { z } from "zod"

export const CreateMarcaSchema = z.object({
  name: z
    .string({ error: "El nombre es requerido" })
    .min(2, "Mínimo 2 caracteres")
    .max(100)
    .trim(),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Solo minúsculas, número y guiones"),
  idNovaly: z.coerce.number().min(0).max(50),
  imageUrl: z.url({ error: "La imagen es requerida" }),
  isActive: z.boolean().default(true),
})

export const UpdateMarcaSchema = CreateMarcaSchema.partial()

export const MarcaIdSchena = z.object({
  marcaId: z.string().length(24, "ID de MongoDB inválido"),
})

export type CreateMarcaDTO = z.infer<typeof CreateMarcaSchema>
export type UpdateMarcaDTO = z.infer<typeof UpdateMarcaSchema>

export type MarcaResponseDTO = {
  id: string
  name: string
  slug: string
  idNovaly: number
  imageUrl: string
  isActive: boolean
  createdBy: string
  createdAt?: string
  updatedAt?: string
}
