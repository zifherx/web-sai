import { emailService } from "@/interfaces/application"
import { connectDB, systemEmailFactory } from "@/interfaces/infrastructure"
import { ResponseFactory } from "@/lib"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest): Promise<Response> {
  try {
    await connectDB()
    const body = await req.json()

    const areaEmail = await systemEmailFactory().getByArea("Corporativo")
    if (!areaEmail)
      return ResponseFactory.validationError("Email Corporativo no configurado")

    const result = await emailService.sendLeadCorporativo({
      areaEmail,
      razonSocial: body.razonSocial,
      ruc: body.ruc,
      // reactTemplate: EmailLeadCorporativo({ ...body })  ← cuando lo tengas
    })

    if (!result.success) return ResponseFactory.error(new Error(result.error))
    return ResponseFactory.success(
      { id: result.id },
      "Email corporativo enviado"
    )
  } catch (err) {
    return ResponseFactory.error(err)
  }
}
