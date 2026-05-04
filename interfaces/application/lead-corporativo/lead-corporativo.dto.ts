import z from "zod"

export const CreateLeadCorporativoSchema = z.object({
  // Datos de contacto
  nombres: z.string().min(2, "Nombre requerido"),
  apellidos: z.string().optional(),
  dni: z.string().optional().default(""),
  correoElectronico: z.string().email("Email inválido"),
  celular: z.string().regex(/^9\d{8}$/, "Celular inválido"),
  // Datos de empresa
  razonSocial: z.string().optional().default(""),
  ruc: z.string().optional().default(""),
  // Información adicional
  marcaId: z.string().optional().default(""),
  marcaText: z.string().optional().default(""),
  ciudad: z.string().optional().default(""),
  intencionCompra: z.string().optional().default(""),
  sector: z.string().optional().default(""),
})

export type CreateLeadCorporativoDTO = z.infer<
  typeof CreateLeadCorporativoSchema
>

export type LeadCorporativoResponseDTO = {
  id: string
  nombres: string
  apellidos: string
  dni: string
  correoElectronico: string
  celular: string
  razonSocial: string
  ruc: string
  marcaId: string
  marcaText: string
  ciudad: string
  intencionCompra: string
  sector: string
  createdAt?: string
  updatedAt?: string
}
