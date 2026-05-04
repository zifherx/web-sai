import { EMPRESA_RAZON_SOCIAL, EMPRESA_RUC } from "@/constants"
import { arrayBufferToBase64, makePDFCorreoReclamo } from "@/lib"
import { reclamoService } from "@/services"
import { ICreateReclamoOption, ReclamoResponseType, ReclamoType } from "@/types"
import { useMutation } from "@tanstack/react-query"

export function useCrearReclamo(options?: ICreateReclamoOption) {
  return useMutation<ReclamoResponseType, Error, ReclamoType>({
    mutationFn: async (payload) => {
      const resultado = await reclamoService.create(payload)

      const direccionCompleta = [
        payload.direccion,
        payload.distrito,
        payload.provincia,
        payload.departamento,
      ]
        .filter(Boolean)
        .join(", ")

      let pdfBase64 = ""

      try {
        const pdfArrayBuffer = makePDFCorreoReclamo({
          // Datos del resultado (generados por el backend)
          id: resultado.id,
          numeroReclamo: resultado.numeroReclamo,
          fecha: resultado.fecha,
          hora: resultado.hora,

          // Datos de la sede (vienen del payload original)
          sedeCompra: payload.sedeCompra ?? "",
          sedeCodexHR: payload.sedeCodexHR ?? "",
          sedeDireccion: payload.sedeDireccion ?? "",
          razonSocial: EMPRESA_RAZON_SOCIAL,
          rucEmpresa: EMPRESA_RUC,

          // Datos del consumidor
          nombres: payload.nombres,
          apellidos: payload.apellidos,
          departamento: payload.departamento ?? "",
          provincia: payload.provincia ?? "",
          distrito: payload.distrito ?? "",
          direccion: direccionCompleta,
          tipoDocumento: payload.tipoDocumento ?? "",
          numeroDocumento: payload.numeroDocumento,
          celular: payload.celular ?? "",
          email: payload.email ?? "",

          // Bien
          tipoBien: payload.tipoBien,
          vin: payload.vin ?? "",
          placa: payload.placa ?? "",
          descripcionBien: payload.descripcionBien,
          moneda: payload.moneda ?? "pen",
          importeBien: payload.importeBien ?? 0,

          // Reclamo
          tipoSolicitud: payload.tipoSolicitud,
          detalleSolicitud: payload.detalleSolicitud,
          pedidoSolicitud: payload.pedidoSolicitud,
          isConforme: payload.isConforme ?? true,
        })

        pdfBase64 = arrayBufferToBase64(pdfArrayBuffer)
      } catch (pdfErr: any) {
        console.log("pdfErr: ", pdfErr)
        console.error("[useCrearReclamo] Error generando PDF:", pdfErr.message)
      }

      if (pdfBase64) {
        reclamoService
          .sendEmail({
            numeroReclamo: resultado.numeroReclamo,
            numeroDocumento: payload.numeroDocumento,
            nombres: payload.nombres,
            email: payload.email,
            pdfBase64,
          })
          .catch((err) => {
            console.error(
              "[useCrearReclamo] Error enviando email:",
              err.message
            )
          })
      }

      return resultado
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })
}
