import z from "zod/v3"

export const SendReclamoEmailSchema = z.object({
  numeroReclamo: z.string().min(1, "El número de reclamo es requerido"),
  nombres: z.string().min(1, "El nombre es requerido"),
  numeroDocumento: z.string().min(1, "El número de documento es requerido"),
  email: z.string().optional().default(""),
  pdfBase64: z.string().min(1, "El PDF es requerido"),
})

// ── Cita ──────────────────────────────────────────────────────────────────────

export const SendCitaEmailSchema = z.object({
  email: z.string().email("Email inválido"),
  nombres: z.string().min(1, "El nombre es requerido"),
  numeroDocumento: z.string().min(1, "El número de documento es requerido"),
})

// ── Lead Corporativo ──────────────────────────────────────────────────────────

export const SendLeadCorporativoEmailSchema = z.object({
  razonSocial: z.string().min(1, "La razón social es requerida"),
  ruc: z.string().min(1, "El RUC es requerido"),
})

// ── Types ─────────────────────────────────────────────────────────────────────

export type SendReclamoEmailDTO = z.infer<typeof SendReclamoEmailSchema>
export type SendCitaEmailDTO = z.infer<typeof SendCitaEmailSchema>
export type SendLeadCorporativoEmailDTO = z.infer<
  typeof SendLeadCorporativoEmailSchema
>

export type EmailResponseDTO = {
  id?: string
}
