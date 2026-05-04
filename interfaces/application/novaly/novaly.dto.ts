import z from "zod"

export const NovalyPayloadSchema = z.object({
  // Datos del cliente
  nombreCompleto: z.string().min(2, "El nombre completo es requerido"),
  correoElectronico: z.email({ error: "El email es inválido" }),
  numeroCelular: z.string().min(9, "El celular es requerido"),
  tipoDocumento: z.string().optional().default(""),
  numeroDocumento: z.string().optional().default(""),
  // Datos del Vehiculo
  marcaVehiculo: z.string().optional().default(""),
  modeloVehiculo: z.string().optional().default(""),
  // Ubicación
  ciudadCotizacion: z.string().optional().default(""),
  idMarca: z.number().optional().default(0),
  idTienda: z.number().optional().default(0),
  // Lead
  utmTrafico: z.string().optional().default("WEB"),
})

export type NovalyRequest = z.infer<typeof NovalyPayloadSchema>

export interface NovalyPayload {
  nombres: string
  apellidos: string
  celular: string
  email: string
  tipo_documento: string
  numero_documento: string
  ciudad_origen: string
  marca: string
  modelo: string
  id_marca: number
  id_tienda: number
  form_name: string
  city: string
  utm: string
}
