import { ResponseFactory } from "@/lib"
import {
  emailService,
  SendReclamoEmailBody,
  SendReclamoEmailSchema,
} from "@/modules/application"
import { connectDB, systemEmailFactory } from "@/modules/infrastructure"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest): Promise<Response> {
  try {
    await connectDB()
    const body = await req.json()
    const parsed = SendReclamoEmailSchema.safeParse(body)

    if (!parsed.success) {
      return ResponseFactory.validationError(
        parsed.error.issues[0]?.message ?? "Datos inválidos"
      )
    }

    const { numeroDocumento, numeroReclamo, nombres, email, pdfBase64 } =
      parsed.data as SendReclamoEmailBody

    const areaEmail = await systemEmailFactory().getByArea("Reclamos")

    if (!areaEmail) {
      return ResponseFactory.validationError(
        "Email del área Reclamo no configurado"
      )
    }

    const pdfBuffer = Buffer.from(pdfBase64, "base64")

    const result = await emailService.sendReclamo({
      clienteEmail: email,
      clienteNombre: nombres,
      numeroDocumento,
      numeroReclamo,
      areaEmail,
      pdfBuffer,
      // reactTemplate: TEmailReclamo({ ...body })  ← cuando lo tengas
    })

    if (!result.success) {
      return ResponseFactory.error(
        new Error(result.error ?? "Error al enviar el email")
      )
    }

    return ResponseFactory.success(
      { id: result.id },
      "Email de reclamo enviado"
    )
  } catch (err: any) {
    console.error("[send-email > reclamo]::error", err.message)
    return ResponseFactory.error(err)
  }
}
