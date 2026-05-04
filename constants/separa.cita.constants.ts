import { ITipoDocumentoPersona, ITipoServicioTaller } from "@/types"
import z from "zod/v3"

export const SeparaCitaSchema = z.object({
  // Datos personales
  nombres: z
    .string({ required_error: "El nombre es requerido" })
    .min(2, "Mínimo 2 caracteres"),

  tipoDocumento: z.enum(["DNI", "RUC", "Pasaporte"], {
    required_error: "Selecciona un tipo de documento",
  }),

  numeroDocumento: z
    .string({ required_error: "El número de documento es requerido" })
    .min(8, "Mínimo 8 caracteres")
    .max(15, "Máximo 15 caracteres")
    .regex(/^\d+$/, "Solo se permiten números"),

  celular: z
    .string({ required_error: "El celular es requerido" })
    .length(9, "Debe tener 9 dígitos")
    .regex(/^9\d{8}$/, "Ingresa un celular válido (9XXXXXXXX)"),

  correo: z
    .string({ required_error: "El correo es requerido" })
    .email("Ingresa un correo válido"),

  // Datos del vehículo
  placa: z
    .string({ required_error: "La placa es requerida" })
    .length(6, "La placa debe tener 6 caracteres"),

  kilometraje: z
    .string({ required_error: "El kilometraje es requerido" })
    .min(1, "Ingresa el kilometraje"),

  // Servicio
  ciudad: z
    .string({ required_error: "Selecciona una ciudad" })
    .min(1, "Selecciona una ciudad"),

  marca: z
    .string({ required_error: "Selecciona una marca" })
    .min(1, "Selecciona una marca"),

  concesionario: z
    .string({ required_error: "Selecciona un concesionario" })
    .min(1, "Selecciona un concesionario"),

  tipoServicio: z
    .string({ required_error: "Selecciona un tipo de servicio" })
    .min(1, "Selecciona un tipo de servicio"),

  comentario: z.string().optional(),

  // Legales
  aceptaPolitica: z.boolean().refine((v) => v === true, {
    message: "Debes aceptar la política de datos",
  }),

  autorizaMarketing: z
    .enum(["si", "no"], {
      required_error: "Selecciona una opción",
    })
    .optional(),
})

export type SeparaCitaData = z.infer<typeof SeparaCitaSchema>

export const TIPO_DOCUMENTO_POSVENTA_OPTIONS: ITipoDocumentoPersona[] = [
  { value: "DNI", label: "DNI" },
  { value: "RUC", label: "RUC" },
  { value: "Pasaporte", label: "Pasaporte" },
]

export const TIPO_SERVICIO_POSVENTA_OPTIONS: ITipoServicioTaller[] = [
  { value: "mantenimiento-preventivo", label: "Mantenimiento Preventivo" },
  { value: "mantenimiento-correctivo", label: "Mantenimiento Correctivo" },
  { value: "revision-tecnica", label: "Revisión Técnica" },
  { value: "garantia", label: "Garantía" },
  { value: "instalacion-accesorios", label: "Instalación de Accesorios" },
  { value: "diagnostico", label: "Diagnóstico" },
  { value: "otros", label: "Otros" },
]

export const DOC_LENGTH: Record<string, number> = {
  DNI: 8,
  RUC: 11,
  Pasaporte: 15,
}

export const DOC_HINT: Record<string, string> = {
  DNI: "8 dígitos",
  RUC: "11 dígitos",
  Pasaporte: "hasta 15 caracteres",
}
