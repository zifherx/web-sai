import z from "zod"

export const SendReclamoEmailSchema = z.object({
  // Generales
  numeroReclamo: z.string().min(1, "El número de reclamo es requerido"),
  // Consumidor
  nombres: z.string().min(1),
  numeroDocumento: z.string().min(1),
  email: z.string().optional().default(""),
  pdfBase64: z.string().min(1, "El PDF es requerido"),
})

export type SendReclamoEmailBody = z.infer<typeof SendReclamoEmailSchema>
