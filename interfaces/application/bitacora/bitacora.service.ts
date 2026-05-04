import { IBitacoraRepository } from "@/interfaces/domain/bitacora/bitacora.repository.port"
import { AxiosError, AxiosResponse } from "axios"

export class BitacoraService {
  private readonly novalyUrl: string

  constructor(private readonly repository: IBitacoraRepository) {
    this.novalyUrl =
      process.env.NEW_ENDPOINT_NOVALY ?? process.env.ENDPOINT_NOVALY ?? "N/A"
  }

  async logSuccess(
    response: AxiosResponse,
    requestPayload: unknown
  ): Promise<void> {
    await this.repository
      .create({
        request: {
          body: JSON.stringify(requestPayload),
          authorization: String(response.config?.headers?.Authorization ?? ""),
          accept: String(response.config?.headers?.Accept ?? ""),
        },
        response: {
          body: JSON.stringify(response.data),
          code: response.status,
          statusText: response.statusText,
        },
        method: response.config?.method?.toUpperCase() ?? "POST",
        url: response.config?.url ?? this.novalyUrl,
      })
      .catch((err) =>
        console.error("BitacoraService | logSuccess | save error:", err)
      )
  }

  async logError(error: AxiosError, requestPayload: unknown): Promise<void> {
    await this.repository
      .create({
        request: {
          body: JSON.stringify(requestPayload),
          authorization: String(error.config?.headers?.Authorization ?? ""),
          accept: String(error.config?.headers?.Accept ?? ""),
        },
        response: {
          body: error.response?.data
            ? JSON.stringify(error.response.data)
            : JSON.stringify({ error: error.message }),
          code: error.response?.status ?? 500,
          statusText:
            error.response?.statusText ?? error.code ?? "UNKNOWN_ERROR",
        },
        method: error.config?.method?.toUpperCase() ?? "POST",
        url: error.config?.url ?? this.novalyUrl,
      })
      .catch((err) =>
        console.error("BitacoraService | logError | save error:", err)
      )
  }

  async logValidationError(
    requestData: unknown,
    errorResponse: unknown
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
        url: this.novalyUrl,
      })
      .catch((err) =>
        console.error("BitacoraService | logValidationError | save error:", err)
      )
  }

  async logGenericError(
    requestData: unknown,
    errorResponse: unknown,
    errorMessage: string
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
        url: this.novalyUrl,
      })
      .catch((err) =>
        console.error("BitacoraService | logGenericError | save error:", err)
      )
  }
}
