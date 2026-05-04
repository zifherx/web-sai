import { emailService } from "@/interfaces/application/email/email.service"
import { connectDB } from "@/interfaces/infrastructure/database"
import { systemEmailFactory } from "@/interfaces/infrastructure/di"
import { ResponseFactory } from "@/lib"
import { NextRequest } from "next/server"

const BCC_DEFAULT = ""

export async function POST(req: NextRequest): Promise<Response> {
  try {
    await connectDB()
    const body = await req.json()

    // Obtiene el email del área configurado en SystemEmail
    const areaEmail =
      (await systemEmailFactory().getByArea("Citas")) ?? BCC_DEFAULT

    const result = await emailService.sendCita({
      clienteEmail: body.email,
      clienteNombre: body.nombres,
      numeroDocumento: body.numeroDocumento,
      areaEmail,
      // reactTemplate: CitaEmailTemplate({ ...body })  ← cuando lo tengas
    })

    if (!result.success) return ResponseFactory.error(new Error(result.error))
    return ResponseFactory.success({ id: result.id }, "Email de cita enviado")
  } catch (err) {
    return ResponseFactory.error(err)
  }
}
