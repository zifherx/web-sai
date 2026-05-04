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

      console.group("[useCrearCotizacion] Iniciando flujo de cotización")
      console.log("📦 Payload MongoDB:", {
        nombres: cotizacionPayload.nombres,
        tipoDocumento: cotizacionPayload.tipoDocumento,
        numeroDocumento: cotizacionPayload.numeroDocumento,
        vehiculoId: cotizacionPayload.vehiculoId,
        sedeId: cotizacionPayload.sedeId,
        ciudad: cotizacionPayload.ciudad,
        intencionCompra: cotizacionPayload.intencionCompra,
      })

      // ── Paso 1: guarda cotización en MongoDB ────────────────
      console.time("[1] POST /api/cotizacion")
      const resultado = await cotizacionService.create(cotizacionPayload)
      console.timeEnd("[1] POST /api/cotizacion")
      console.log("✅ Cotización guardada en MongoDB:", {
        id: resultado.id,
        clienteId: resultado.clienteId,
        createdAt: resultado.createdAt,
      })

      // ── Paso 2: envía lead a Novaly (fire & forget) ─────────
      console.log("🚀 Iniciando envío a Novaly (fire & forget)...", {
        marcaVehiculo: _novaly?.marcaNombre ?? "(sin marca)",
        modeloVehiculo: _novaly?.vehiculoNombre ?? "(sin modelo)",
        idMarca: _novaly?.idMarca ?? 0,
        idTienda: _novaly?.idTienda ?? 0,
      })

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
          utmTrafico: "WEB",
        })
        .then(() => {
          console.log("✅ Lead enviado a Novaly correctamente")
          console.groupEnd()
        })
        .catch((err: Error) => {
          console.warn(
            "⚠️ El envío a Novaly falló — la cotización en MongoDB ya está guardada",
            err.message
          )
          console.groupEnd()
        })

      return resultado
    },
    onSuccess: (resultado) => {
      console.log("[useCrearCotizacion] onSuccess →", resultado.id)
      options?.onSuccess?.(resultado)
    },
    onError: (err) => {
      console.error("[useCrearCotizacion] onError →", err.message)
      console.groupEnd()
      options?.onError?.(err)
    },
  })
}
