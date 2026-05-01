import { SedeFiltersSchema } from "@/interfaces/application/sede/sede.dto"
import { SedeValidationError } from "@/interfaces/domain/sede/sede.errors"
import { connectDB } from "@/interfaces/infrastructure/database/connection"
import { sedeFactory } from "@/interfaces/infrastructure/di/sede.factory"
import { ResponseFactory } from "@/lib/response-factory"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest): Promise<Response> {
  try {
    await connectDB()
    const raw = Object.fromEntries(req.nextUrl.searchParams)
    const parsed = SedeFiltersSchema.safeParse(raw)
    if (!parsed.success) throw new SedeValidationError(parsed.error.message)

    const data = await sedeFactory().getAll(parsed.data)
    return ResponseFactory.success(data, "Sedes obtenidas")
  } catch (err) {
    return ResponseFactory.error(err)
  }
}
