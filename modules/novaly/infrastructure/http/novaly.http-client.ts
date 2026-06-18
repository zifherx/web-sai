import { NovalyApiError } from "@/modules/novaly/domain/errors/NovalyDomainError"
import { INovalyClient } from "@/modules/novaly/domain/repository/INovalyRepository"
import type {
  NovalyLeadResult,
  NovalyPayload,
} from "@/modules/novaly/domain/types/NovalyTypes"
import axios, { AxiosError } from "axios"

/**
 * Adaptador de salida HTTP para la API de Novaly.
 *
 * Implementa `INovalyClient` usando Axios.
 * Responsabilidades:
 * - Realizar la llamada HTTP POST a la API de Novaly
 * - Convertir los errores de Axios en `NovalyApiError` del dominio,
 *   de modo que el use-case nunca necesita conocer Axios
 * - Retornar `NovalyLeadResult` normalizado
 *
 * La URL se resuelve desde variables de entorno con fallback entre
 * `NEW_ENDPOINT_NOVALY` y `ENDPOINT_NOVALY` para soportar el período de
 * migración entre endpoints de Novaly.
 */
export class NovalyHttpClient implements INovalyClient {
  private readonly apiUrl: string

  constructor() {
    this.apiUrl =
      process.env.NEW_ENDPOINT_NOVALY ?? process.env.ENDPOINT_NOVALY ?? ""
    if (!this.apiUrl) {
      throw new Error(
        "Variable de entorno requerida: NEW_ENDPOINT_NOVALY o ENDPOINT_NOVALY"
      )
    }
  }

  async enviarLead(payload: NovalyPayload): Promise<NovalyLeadResult> {
    try {
      const response = await axios.post(this.apiUrl, payload, {
        headers: { "Content-Type": "application/json" },
      })

      return {
        success: response.data?.success ?? true,
        message: response.data?.message ?? "Lead enviado correctamente",
        raw: response.data,
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const novalyError = err.response?.data as
          | { success?: boolean; error?: string; camposFaltantes?: string[] }
          | undefined

        throw new NovalyApiError(
          novalyError?.error ?? "Error al procesar lead en Novaly",
          err.response?.status ?? 500,
          novalyError?.camposFaltantes
        )
      }

      // Error de red u otro error inesperado
      const message = err instanceof Error ? err.message : "Error desconocido"
      throw new NovalyApiError(message, 500)
    }
  }
}
