import { NextResponse } from "next/server"

export class ResponseFactory {
  static success<T>(data: T, message = "OK", status = 200): NextResponse {
    return NextResponse.json({ success: true, message, data }, { status })
  }

  static created<T>(data: T, message = "Creado"): NextResponse {
    return NextResponse.json({ success: true, message, data }, { status: 201 })
  }

  static validationError(message: string): NextResponse {
    return NextResponse.json(
      { success: false, message, error: "Validation Error" },
      { status: 422 }
    )
  }

  static error(err: unknown): NextResponse {
    if (err instanceof Error && "statusCode" in err) {
      const e = err as { message: string; name: string; statusCode: number }
      return NextResponse.json(
        { success: false, message: e.message, error: e.name },
        { status: e.statusCode }
      )
    }
    console.error("[500]", err)
    return NextResponse.json(
      { success: false, message: "Error interno", error: "InternalError" },
      { status: 500 }
    )
  }
}
