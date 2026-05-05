import {
  CotizacionFiltersSchema,
  CreateCotizacionSchema,
} from "@/interfaces/application"
import { connectDB, cotizacionFactory } from "@/interfaces/infrastructure"
import { ResponseFactory } from "@/lib"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest): Promise<Response> {
  try {
    await connectDB()

    const { searchParams } = req.nextUrl
    const rawFilters = {
      from: searchParams.get("from") ?? undefined,
      to: searchParams.get("to") ?? undefined,
      sedeId: searchParams.get("sedeId") ?? undefined,
      intencionCompra: searchParams.get("intencionCompra") ?? undefined,
    }

    // Validación ligera de los filtros
    const parsed = CotizacionFiltersSchema.safeParse(rawFilters)
    const filters = parsed.success ? parsed.data : {}

    const data = await cotizacionFactory().getAll(filters)
    return ResponseFactory.success(
      data,
      `${data.length} cotizaciones obtenidas`
    )
  } catch (err) {
    return ResponseFactory.error(err)
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    await connectDB()

    const body = await req.json()
    const parsed = CreateCotizacionSchema.safeParse(body)

    if (!parsed.success) {
      return ResponseFactory.validationError(
        parsed.error.issues[0]?.message ?? "Datos inválidos"
      )
    }

    const data = await cotizacionFactory().create(parsed.data)
    return ResponseFactory.created(data, "Cotización registrada correctamente")
  } catch (err) {
    return ResponseFactory.error(err)
  }
}
