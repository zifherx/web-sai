import { httpClient } from "@/lib"
import {
  APIResponse,
  CotizacionResponseType,
  CotizacionType,
  SendToNovalyParams,
} from "@/types"

export const cotizacionService = {
  create: async (payload: CotizacionType): Promise<CotizacionResponseType> => {
    const { data } = await httpClient.post<APIResponse<CotizacionResponseType>>(
      "/cotizacion",
      payload
    )
    return data.data
  },

  sendToNovaly: async (params: SendToNovalyParams): Promise<void> => {
    await httpClient.post("/novaly/new-lead", {
      nombreCompleto: params.nombreCompleto,
      correoElectronico: params.correoElectronico,
      numeroCelular: params.numeroCelular,
      tipoDocumento: params.tipoDocumento ?? "",
      numeroDocumento: params.numeroDocumento ?? "",
      marcaVehiculo: params.marcaVehiculo ?? "",
      modeloVehiculo: params.modeloVehiculo ?? "",
      ciudadCotizacion: params.ciudadCotizacion ?? "",
      idMarca: params.idMarca ?? 0,
      idTienda: params.idTienda ?? 0,
      utmTrafico: params.utmTrafico ?? "WEB",
    })
  },
}
