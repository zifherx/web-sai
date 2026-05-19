import { z } from "zod"

export const CreateCarroceriaSchema = z.object({
  name: z
    .string({ error: "El nombre es requerido" })
    .min(2, "Mínimo 2 caracteres")
    .max(100)
    .trim(),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Solo minúsculas, número y guiones"),
  isActive: z.boolean().default(true),
})

export const UpdateCarroceriaSchema = CreateCarroceriaSchema.partial()

export const CarroceriaIdSchena = z.object({
  marcaId: z.string().length(24, "ID de MongoDB inválido"),
})

export type CreateCarroceriaDTO = z.infer<typeof CreateCarroceriaSchema>
export type UpdateCarroceriaDTO = z.infer<typeof UpdateCarroceriaSchema>

export type CarroceriaResponseDTO = {
  id: string
  name: string
  slug: string
  isActive: boolean
  createdBy: string
  createdAt?: string
  updatedAt?: string
}
