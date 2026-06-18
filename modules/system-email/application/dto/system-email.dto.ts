import z from "zod/v3"

// ── Áreas válidas ─────────────────────────────────────────────────────────────

export const VALID_AREAS = [
  "Comercial",
  "Corporativo",
  "Reclamos",
  "Citas",
  "General",
] as const

// ── Create ────────────────────────────────────────────────────────────────────

export const CreateSystemEmailSchema = z.object({
  area: z.string().min(1, "El área es requerida"),
  email: z.string().email("Email inválido"),
  isActive: z.boolean().default(true),
})

// ── Params ────────────────────────────────────────────────────────────────────

export const SystemEmailIdSchema = z.object({
  id: z.string().length(24, "ID de MongoDB inválido"),
})

export const SystemEmailAreaSchema = z.object({
  area: z.string().min(1, "El área es requerida"),
})

// ── Types ─────────────────────────────────────────────────────────────────────

export type CreateSystemEmailDTO = z.infer<typeof CreateSystemEmailSchema>

export type SystemEmailResponseDTO = {
  id: string
  area: string
  email: string
  isActive: boolean
  createdBy: string
  createdAt?: string
  updatedAt?: string
}

/**
 * DTO reducido para el endpoint público GET /area/[area].
 * Solo expone el email — no revela metadata interna (createdBy, timestamps).
 */
export type SystemEmailByAreaResponseDTO = {
  area: string
  email: string
}
