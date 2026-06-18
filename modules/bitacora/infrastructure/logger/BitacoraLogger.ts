import {
  IBitacoraLogPort,
  IBitacoraRepository,
} from "@/modules/bitacora/domain/repositories/IBitacoraRepository"

/**
 * Servicio de infraestructura de logging para llamadas HTTP a Novaly.
 *
 * Implementa `IBitacoraLogPort` — la interfaz que otros módulos de
 * infraestructura (el cliente HTTP de Novaly) usan para registrar eventos.
 *
 * Responsabilidades:
 * - Normalizar los datos de éxito/error de Axios al formato de `ICreateBitacoraData`
 * - Delegar la persistencia al `IBitacoraRepository`
 * - Absorber silenciosamente los errores de escritura para no interrumpir
 *   el flujo principal (logging no debe romper la operación que lo invoca)
 *
 * El `novalyUrl` se resuelve desde variables de entorno como fallback:
 * permite que el URL de destino se configure por entorno sin cambiar código.
 */

export class BitacoraLogger implements IBitacoraLogPort {
  private readonly novalyUrl: string

  constructor(private readonly repository: IBitacoraRepository) {
    this.novalyUrl =
      process.env.NEW_ENDPOINT_NOVALY ?? process.env.ENDPOINT_NOVALY ?? "N/A"
  }

  async logSuccess(
    responseBody: string,
    status: number,
    statusText: string,
    method: string,
    url: string,
    requestPayload: unknown,
    authorization = ""
  ): Promise<void> {
    await this.repository
      .create({
        request: {
          body: JSON.stringify(requestPayload),
          authorization,
          accept: "application/json",
        },
        response: {
          body: responseBody,
          code: status,
          statusText,
        },
        method: method.toUpperCase(),
        url: url || this.novalyUrl,
      })
      .catch((err) => console.error("[BitacoraLogger] logSuccess error:", err))
  }

  async logError(
    status: number,
    statusText: string,
    errorBody: string,
    method: string,
    url: string,
    requestPayload: unknown,
    authorization = ""
  ): Promise<void> {
    await this.repository
      .create({
        request: {
          body: JSON.stringify(requestPayload),
          authorization,
          accept: "application/json",
        },
        response: {
          body: errorBody,
          code: status,
          statusText,
        },
        method: method.toUpperCase(),
        url: url || this.novalyUrl,
      })
      .catch((err) => console.error("[BitacoraLogger] logError error:", err))
  }

  async logValidationError(
    requestData: unknown,
    errorResponse: unknown,
    url: string
  ): Promise<void> {
    await this.repository
      .create({
        request: {
          body: JSON.stringify(requestData),
          authorization: "",
          accept: "application/json",
        },
        response: {
          body: JSON.stringify(errorResponse),
          code: 400,
          statusText: "Bad Request - Validation Error",
        },
        method: "POST",
        url: url || this.novalyUrl,
      })
      .catch((err) =>
        console.error("[BitacoraLogger] logValidationError error:", err)
      )
  }

  async logGenericError(
    requestData: unknown,
    errorResponse: unknown,
    errorMessage: string,
    url: string
  ): Promise<void> {
    await this.repository
      .create({
        request: {
          body: JSON.stringify(requestData),
          authorization: "",
          accept: "application/json",
        },
        response: {
          body: JSON.stringify({
            ...(errorResponse as object),
            originalError: errorMessage,
          }),
          code: 500,
          statusText: "Internal Server Error",
        },
        method: "POST",
        url: url || this.novalyUrl,
      })
      .catch((err) =>
        console.error("[BitacoraLogger] logGenericError error:", err)
      )
  }
}
