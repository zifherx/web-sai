import { z } from "zod"

export const CreatePortadaSchema = z.object({
  name: z
    .string({ error: "El nombre es requerido" })
    .min(2, "Mínimo 2 caracteres")
    .max(100)
    .trim(),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Solo minúsculas, número y guiones"),
  imageUrl: z.url({ error: "La imagen es requerida" }),
  isActive: z.boolean().default(true),
})

export const UpdatePortadaSchema = CreatePortadaSchema.partial()

export const PortadaIdSchena = z.object({
  portadaId: z.string().length(24, "ID de MongoDB inválido"),
})

export type CreatePortadaDTO = z.infer<typeof CreatePortadaSchema>
export type UpdatePortadaDTO = z.infer<typeof UpdatePortadaSchema>

export type PortadaResponseDTO = {
  id: string
  name: string
  slug: string
  imageUrl: string
  isActive: boolean
  createdBy: string
  createdAt?: string
  updatedAt?: string
}
