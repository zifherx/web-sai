import {
  BitacoraService,
  NovalyMapper,
  NovalyPayloadSchema,
  NovalyService,
} from "@/interfaces/application"
import { bitacoraFactory, connectDB } from "@/interfaces/infrastructure"
import { AxiosError } from "axios"
import { NextRequest, NextResponse } from "next/server"

export class NovalyController {
  private readonly novalyService: NovalyService
  private readonly bitacoraService: BitacoraService

  constructor() {
    this.novalyService = new NovalyService()
    this.bitacoraService = bitacoraFactory()
  }

  async handlePost(req: NextRequest): Promise<NextResponse> {
    let requestData: any
    const reqId = Date.now()

    try {
      await connectDB()
      requestData = await req.json()

      console.group(`[NovalyController] POST #${reqId}`)
      console.log("📩 Payload recibido:", {
        nombreCompleto: requestData.nombreCompleto,
        correoElectronico: requestData.correoElectronico,
        numeroCelular: requestData.numeroCelular,
        idMarca: requestData.idMarca,
        idTienda: requestData.idTienda,
        utmTrafico: requestData.utmTrafico,
      })

      // Validación
      const parsed = NovalyPayloadSchema.safeParse(requestData)
      if (!parsed.success) {
        const errorResponse = {
          success: false,
          error: "Campos requeridos faltantes",
          issues: parsed.error.issues.map((i) => i.path.join(".") || i.message),
        }

        console.warn("❌ Validación fallida:", errorResponse.issues)
        console.groupEnd()
        this.bitacoraService
          .logValidationError(requestData, errorResponse)
          .catch(console.error)
        return NextResponse.json(errorResponse, { status: 400 })
      }

      const payload = NovalyMapper.toPayload(parsed.data)
      console.log("🗺️  Payload mapeado para Novaly:", {
        nombres: payload.nombres,
        apellidos: payload.apellidos,
        marca: payload.marca,
        modelo: payload.modelo,
        id_marca: payload.id_marca,
        id_tienda: payload.id_tienda,
        city: payload.city,
      })

      console.time(`[NovalyController] POST #${reqId} → Novaly`)
      const response = await this.novalyService.enviarLead(payload)
      console.timeEnd(`[NovalyController] POST #${reqId} → Novaly`)

      console.log("✅ Novaly respondió 200:", response.data)
      console.groupEnd()

      // Bitácora de éxito — fire & forget
      this.bitacoraService.logSuccess(response, payload).catch(console.error)

      return NextResponse.json({
        success: response.data.success,
        message: response.data.message,
        response: response.data,
      })
    } catch (err) {
      console.groupEnd()
      return this.handleError(err, requestData, reqId)
    }
  }

  private async handleError(
    err: unknown,
    requestData?: any,
    reqId?: number
  ): Promise<NextResponse> {
    if (err instanceof AxiosError) {
      const novalyError = err.response?.data as
        | {
            success?: boolean
            error?: string
            camposFaltantes?: string[]
          }
        | undefined

      console.error(
        `[NovalyController] #${reqId} Novaly respondió ${err.response?.status} →`,
        {
          status: novalyError?.error,
          camposFaltantes: novalyError?.camposFaltantes,
        }
      )

      const errorResponse = {
        success: false,
        message: novalyError?.error ?? "Error al procesar lead en Novaly",
        camposFaltantes: novalyError?.camposFaltantes ?? [],
        error: err.message,
      }

      this.bitacoraService.logError(err, requestData).catch(console.error)
      return NextResponse.json(errorResponse, {
        status: err.response?.status ?? 500,
      })
    }

    const message = err instanceof Error ? err.message : "Error desconocido"
    console.error(`[NovalyController] #${reqId} Error genérico →`, message)

    const errorResponse = {
      success: false,
      error: "Error al procesar lead",
      message,
    }
    this.bitacoraService
      .logGenericError(requestData, errorResponse, message)
      .catch(console.error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
