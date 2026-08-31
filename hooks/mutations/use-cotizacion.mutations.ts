import { cotizacionService } from "@/services"
import {
  CotizacionEnrichedMeta,
  CotizacionResponseType,
  CotizacionType,
  ICreateCotizacionOption,
} from "@/types"
import { useMutation } from "@tanstack/react-query"

export function useCrearCotizacion(options?: ICreateCotizacionOption) {
  return useMutation<
    CotizacionResponseType,
    Error,
    CotizacionType & { _novaly?: CotizacionEnrichedMeta }
  >({
    mutationFn: async (payload) => {
      const { _novaly, ...cotizacionPayload } = payload

      // ── Paso 1: guarda cotización en MongoDB ────────────────
      const resultado = await cotizacionService.create({
        ...cotizacionPayload,
        utmSource: _novaly?.utmSource,
        utmMedium: _novaly?.utmMedium,
        utmCampaign: _novaly?.utmCampaign,
        utmTerm: _novaly?.utmTerm,
      })

      // ── Paso 2: envía lead a Novaly (fire & forget) ─────────
      cotizacionService
        .sendToNovaly({
          nombreCompleto: cotizacionPayload.nombres,
          correoElectronico: cotizacionPayload.email,
          numeroCelular: cotizacionPayload.celular,
          tipoDocumento: cotizacionPayload.tipoDocumento,
          numeroDocumento: cotizacionPayload.numeroDocumento,
          ciudadCotizacion: cotizacionPayload.ciudad,
          marcaVehiculo: _novaly?.marcaNombre ?? "",
          modeloVehiculo: _novaly?.vehiculoNombre ?? "",
          idMarca: _novaly?.idMarca ?? 0,
          idTienda: _novaly?.idTienda ?? 0,
          utmTrafico: _novaly?.utm ?? "WEB",
          // UTMs granulares — el backend los consolida en el campo utm de Novaly
          utmSource: _novaly?.utmSource,
          utmMedium: _novaly?.utmMedium,
          utmCampaign: _novaly?.utmCampaign,
          utmTerm: _novaly?.utmTerm,
        })
        .then(() => {
          options?.onNovalySync?.({ success: true })
        })
        .catch((err: Error) => {
          console.warn(
            "⚠️ El envío a Novaly falló — la cotización en MongoDB ya está guardada",
            err.message
          )
          options?.onNovalySync?.({ success: false, error: err.message })
        })

      return resultado
    },
    onSuccess: (resultado) => {
      options?.onSuccess?.(resultado)
    },
    onError: (err) => {
      options?.onError?.(err)
    },
  })
}
