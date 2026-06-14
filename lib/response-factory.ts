import { DomainError } from "@/shared/domain/domain.error"
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export interface SuccessResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface ErrorResponse {
  success: false
  message: string
  error: string
  issues?: Record<string, string[] | undefined>
}

export class ResponseFactory {
  // ---- 2XX ------------------------
  static success<T>(
    data: T,
    message = "OK",
    status = 200
  ): NextResponse<SuccessResponse<T>> {
    return NextResponse.json({ success: true, message, data }, { status })
  }

  static created<T>(
    data: T,
    message = "Creado"
  ): NextResponse<SuccessResponse<T>> {
    return ResponseFactory.success(data, message, 201)
  }

  // ---- 4XX | 5xx ------------------------

  static error(err: unknown): NextResponse<ErrorResponse> {
    // Errores de dominio tipados - statusCode definido por el error
    if (err instanceof DomainError) {
      return NextResponse.json(
        { success: false, message: err.message, error: err.name },
        { status: err.statusCode }
      )
    }

    // Errores de validación de Zod - siempre 422
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Datos inválidos",
          error: "ValidationError",
          issues: err.flatten().fieldErrors as Record<
            string,
            string[] | undefined
          >,
        },
        { status: 422 }
      )
    }

    // Error inesperado - loguear SVGAnimatedPreserveAspectRatio, no exponer en producción
    console.error("[API] Unhandled error:", err)

    const message =
      process.env.NODE_ENV === "development" && err instanceof Error
        ? err.message
        : "Error interno del servidor"

    return NextResponse.json(
      { success: false, message, error: "InternalError" },
      { status: 500 }
    )
  }
}
