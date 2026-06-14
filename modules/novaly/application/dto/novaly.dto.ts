import z from "zod"

export const NovalyPayloadSchema = z.object({
  // Datos del cliente
  nombreCompleto: z.string().min(2, "El nombre completo es requerido"),
  correoElectronico: z.string().email("El email es inválido"),
  numeroCelular: z.string().min(9, "El celular es requerido"),
  tipoDocumento: z.string().optional().default(""),
  numeroDocumento: z.string().optional().default(""),
  // Datos del vehículo
  marcaVehiculo: z.string().optional().default(""),
  modeloVehiculo: z.string().optional().default(""),
  // Ubicación y tienda
  ciudadCotizacion: z.string().optional().default(""),
  idMarca: z.number().optional().default(0),
  idTienda: z.number().optional().default(0),
  // Lead tracking
  utmTrafico: z.string().optional().default("WEB"),
})

export type NovalyRequestDTO = z.infer<typeof NovalyPayloadSchema>

export type NovalyResponseDTO = {
  success: boolean
  message: string
}
