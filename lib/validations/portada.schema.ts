import z from "zod"

export const portadaFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, `El nombre debe tener al menos 3 caracteres`)
    .max(100, `El nombre no puede superar los 100 caracteres`),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]*$/, `Solo minúsculas, número y guiones`),
  imageUrl: z
    .string()
    .trim()
    .min(1, `La imagen es obligatoria`)
    .url(`Debe ser una URL válida`),
  isActive: z.boolean(),
})

export type PortadaFormValues = z.infer<typeof portadaFormSchema>
