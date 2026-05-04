import {
  CitaFiltersSchema,
  CreateCitaSchema,
} from "@/interfaces/application/cita/cita.dto"
import { connectDB } from "@/interfaces/infrastructure/database"
import { citaFactory } from "@/interfaces/infrastructure/di"
import { ResponseFactory } from "@/lib"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest): Promise<Response> {
  try {
    await connectDB()

    const { searchParams } = req.nextUrl
    const rawFilters = {
      sedeId: searchParams.get("sedeId") ?? undefined,
      tipoServicio: searchParams.get("tipoServicio") ?? undefined,
      from: searchParams.get("from") ?? undefined,
      to: searchParams.get("to") ?? undefined,
    }

    const parsed = CitaFiltersSchema.safeParse(rawFilters)
    const filters = parsed.success ? parsed.data : {}

    const data = await citaFactory().getAll(filters)
    return ResponseFactory.success(data, `${data.length} citas obtenidas`)
  } catch (err) {
    return ResponseFactory.error(err)
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    await connectDB()

    const body = await req.json()
    const parsed = CreateCitaSchema.safeParse(body)

    if (!parsed.success) {
      return ResponseFactory.validationError(
        parsed.error.issues[0]?.message ?? "Datos inválidos"
      )
    }

    const data = await citaFactory().create(parsed.data)

    return ResponseFactory.created(data, "Cita registrada correctamente")
  } catch (err) {
    return ResponseFactory.error(err)
  }
}
