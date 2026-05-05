import {
  ICorporativoValueLabel,
  IFormCorporativo,
  IHeroCorporativo,
  IIntroCorporativo,
} from "@/types"
import z from "zod/v3"

export const CORPORATIVO_HERO: IHeroCorporativo = {
  eyebrow: "Automotores Inka",
  heading: "Soluciones Corporativas",
  imageSrc: "/images/corporativo/hero-banner-degrade.png",
  imageAlt: "Flota de vehículos Automotores Inka — Soluciones Corporativas",
}

export const CORPORATIVO_INTRO: IIntroCorporativo = {
  text: "En Automotores Inka brindamos soluciones corporativas **flexibles que se adaptan a la operación de tu empresa.** Acompañamos la gestión de tu flota con atención coordinada, respaldo oportuno y servicios diseñados para optimizar tiempos y asegurar la continuidad de tu negocio.",
}

export const CORPORATIVO_FORM: IFormCorporativo = {
  heading: "Cotiza ahora y obtén beneficios",
  legal:
    "Al enviar el formulario autorizas el tratamiento de tus datos personales conforme a la Política de Protección de Datos Personales de Automotores Inka.",
}

export const CorporativoSchema = z.object({
  nombres: z
    .string({ required_error: "Ingresa tu nombre" })
    .min(2, "Mínimo 2 caracteres")
    .trim(),
  dni: z
    .string({ required_error: "Ingresa tu DNI" })
    .min(8, "Mínimo 8 dígitos")
    .max(15),
  paseFiscal: z.string().optional(),
  ruc: z.string().optional(),
  marca: z
    .string({ required_error: "Selecciona una marca" })
    .min(1, "Selecciona una marca"),
  celular: z
    .string({ required_error: "Ingresa tu celular" })
    .regex(/^9\d{8}$/, "Celular inválido (9XXXXXXXX)"),
  email: z
    .string({ required_error: "Ingresa tu email" })
    .email("Email inválido"),
  sector: z.string({ required_error: "Ingresa tu sector" }).min(2),
  periodoCompra: z.string({ required_error: "Selecciona un período" }).min(1),
  aceptaPolitica: z
    .boolean()
    .refine((v) => v === true, { message: "Debes aceptar la política" }),
})

export type CorporativoData = z.infer<typeof CorporativoSchema>

export const CORPORATIVO_PERIODO_OPTIONS: ICorporativoValueLabel[] = [
  { value: "inmediata", label: "Lo quiero ahora" },
  { value: "1_mes", label: "En 1 mes" },
  { value: "3_meses", label: "En 3 meses" },
  { value: "6_meses", label: "En 6 meses" },
  { value: "informacion", label: "Solo me informo" },
]

export const CORPORATIVO_SECTOR_OPTIONS: ICorporativoValueLabel[] = [
  { label: "Agroindustria y agricultura", value: "agroindustria-agricultura" },
  { label: "Alimentos y bebidas", value: "alimentos-bebidas" },
  { label: "Arrendamiento", value: "arrendamiento" },
  { label: "Construcción e inmobiliaria", value: "construccion-inmobiliaria" },
  { label: "Distribución y logística", value: "distribucion-logistica" },
  { label: "E-commerce", value: "ecommerce" },
  { label: "Educación", value: "educacion" },
  {
    label: "Energía y servicios públicos",
    value: "energia-servicios-publicos",
  },
  { label: "Eventos y Producción", value: "eventos-produccion" },
  { label: "Farmaceutica y salud", value: "farmaceutica-salud" },
  {
    label: "Gobierno y entidades públicas",
    value: "gobierno-entidades-publicas",
  },
  { label: "Hoteles y Turismo", value: "hoteles-turismo" },
  { label: "Limpieza industrial", value: "limpieza-industrial" },
  { label: "Mantenimiento", value: "mantenimiento" },
  { label: "Manufactura e industria", value: "manufactura-industria" },
  { label: "Minería", value: "mineria" },
  { label: "Pesca", value: "pesca" },
  { label: "Restaurantes", value: "restaurantes" },
  { label: "Retail y comercio", value: "retail-comercio" },
  { label: "Servicios generales", value: "servicios-generales" },
  { label: "Telecomunicaciones", value: "telecomunicaciones" },
  { label: "Transporte y carga", value: "transporte-carga" },
]
