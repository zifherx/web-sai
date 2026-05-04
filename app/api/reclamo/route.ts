import { CreateReclamoSchema } from "@/interfaces/application/reclamo/reclamo.dto"
import { connectDB } from "@/interfaces/infrastructure/database"
import { reclamoFactory } from "@/interfaces/infrastructure/di"
import { ResponseFactory } from "@/lib"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest): Promise<Response> {
  try {
    await connectDB()

    const { searchParams } = req.nextUrl
    const filters = {
      tipoSolicitud: searchParams.get("tipoSolicitud") ?? undefined,
      sedeCodexHR: searchParams.get("sedeCodexHR") ?? undefined,
      fecha: searchParams.get("fecha") ?? undefined,
    }

    const data = await reclamoFactory().getAll(filters)
    return ResponseFactory.success(data, "Reclamos obtenidos")
  } catch (err) {
    return ResponseFactory.error(err)
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    await connectDB()

    const body = await req.json()
    const parsed = CreateReclamoSchema.safeParse(body)

    if (!parsed.success) {
      return ResponseFactory.validationError(
        parsed.error.issues[0]?.message ?? "Datos inválidos"
      )
    }

    const data = await reclamoFactory().create(parsed.data)
    return ResponseFactory.created(data, "Reclamo registrado correctamente")
  } catch (err) {
    return ResponseFactory.error(err)
  }
}
