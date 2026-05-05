import {
  CreateLeadCorporativoSchema,
  emailService,
} from "@/interfaces/application"
import {
  connectDB,
  leadCorporativoFactory,
  systemEmailFactory,
} from "@/interfaces/infrastructure"
import { ResponseFactory } from "@/lib"
import { NextRequest } from "next/server"

export async function GET(): Promise<Response> {
  try {
    await connectDB()
    const data = await leadCorporativoFactory().getAll()
    return ResponseFactory.success(data, `${data.length} leads corporativos`)
  } catch (err) {
    return ResponseFactory.error(err)
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    await connectDB()

    const body = await req.json()
    const parsed = CreateLeadCorporativoSchema.safeParse(body)

    if (!parsed.success) {
      return ResponseFactory.validationError(
        parsed.error.issues[0]?.message ?? "Datos inválidos"
      )
    }

    const lead = await leadCorporativoFactory().create(parsed.data)

    // Email — fire & forget: si falla no bloquea la respuesta
    systemEmailFactory()
      .getByArea("Corporativo")
      .then((areaEmail) => {
        if (areaEmail) {
          emailService
            .sendLeadCorporativo({
              areaEmail,
              razonSocial: lead.razonSocial,
              ruc: lead.ruc,
            })
            .catch(console.error)
        }
      })
      .catch(console.error)

    return ResponseFactory.created(lead, "Lead corporativo registrado")
  } catch (err) {
    return ResponseFactory.error(err)
  }
}
