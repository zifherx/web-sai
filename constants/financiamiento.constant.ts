import {
  IBooleanLabel,
  ILabelValue,
  IWizardStepForm,
} from "@/types/financiamiento.types"
import z from "zod/v3"

export const WIZARD_STEPS_FORM: IWizardStepForm[] = [
  { number: 1, label: "Marca", sublabel: "Elige tu marca favorita" },
  { number: 2, label: "Modelo", sublabel: "Selecciona el modelo ideal" },
  { number: 3, label: "Ubicación", sublabel: "Encuentra tu concesionario" },
  { number: 4, label: "Contacto", sublabel: "Completa tus datos" },
]

export const INTENCION_COMPRA_OPTIONS: ILabelValue[] = [
  { value: "inmediata", label: "Lo quiero ahora" },
  { value: "1_mes", label: "En 1 mes" },
  { value: "3_meses", label: "En 3 meses" },
  { value: "6_meses", label: "En 6 meses" },
  { value: "solo_informacion", label: "Solo me informo por ahora" },
]

export const TIPO_DOCUMENTO_OPTIONS: ILabelValue[] = [
  { value: "DNI", label: "DNI" },
  { value: "RUC", label: "RUC" },
  { value: "CE", label: "Carné de extranjería" },
  { value: "Pasaporte", label: "Pasaporte" },
]

export const TRATAMIENTO_DATOS_OFERTAS_COMERCIALES: IBooleanLabel[] = [
  { value: true, label: "Sí autorizo a Automotores Inka" },
  {
    value: false,
    label:
      "No autorizo, prefiero perder la oportunidad de recibir promociones y ofertas.",
  },
]

export const Step1Schema = z.object({
  marcaId: z.string().min(1, "Selecciona una marca"),
  marcaNombre: z.string().min(1),
  marcaSlug: z.string().min(1),
})

export const Step2Schema = z.object({
  vehiculoId: z.string().min(1, "Selecciona un modelo"),
  vehiculoNombre: z.string().min(1),
  vehiculoSlug: z.string().min(1),
  precioBase: z.number(),
})

export const Step3Schema = z.object({
  sedeId: z.string().min(1, "Selecciona un concesionario"),
  sedeNombre: z.string().min(1),
})

export const Step4Schema = z.object({
  nombres: z.string().min(2, "Ingresa tu nombre completo").trim(),
  tipoDocumento: z.enum(["DNI", "RUC", "CE", "Pasaporte"], {
    required_error: "Selecciona un tipo de documento",
  }),
  numeroDocumento: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .max(15, "Máximo 15 caracteres"),
  celular: z
    .string()
    .regex(/^9\d{8}$/, "Ingresa un celular válido (9XXXXXXXX)"),
  email: z.string().email("Ingresa un email válido"),
  intencionCompra: z.enum(
    ["inmediata", "1_mes", "3_meses", "6_meses", "solo_informacion"],
    { required_error: "Selecciona una intención de compra" }
  ),
  aceptaPolitica: z.boolean().refine((v) => v, {
    message: "Debes aceptar la política de datos",
  }),
  autorizaMarketing: z.boolean().optional(),
})

// ─── Schema completo del wizard ───────────────────────────────

export const FinanciaWizardSchema = Step1Schema.merge(Step2Schema)
  .merge(Step3Schema)
  .merge(Step4Schema)

export type FinanciaWizardData = z.infer<typeof FinanciaWizardSchema>
export type Step1Data = z.infer<typeof Step1Schema>
export type Step2Data = z.infer<typeof Step2Schema>
export type Step3Data = z.infer<typeof Step3Schema>
export type Step4Data = z.infer<typeof Step4Schema>
