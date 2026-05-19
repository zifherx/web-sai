import { ResponseFactory } from "@/lib"
import { VehiculoFiltersSchema } from "@/modules/application"
import { VehiculoValidationError } from "@/modules/domain"
import { connectDB, vehiculoFactory } from "@/modules/infrastructure"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest): Promise<Response> {
  try {
    await connectDB()

    const { searchParams } = req.nextUrl
    const slug = searchParams.get("slug")

    if (slug) {
      const data = await vehiculoFactory().getBySlug(slug)
      return ResponseFactory.success(data, "Vehículo obtenido")
    }
    const raw = Object.fromEntries(searchParams)
    const parsed = VehiculoFiltersSchema.safeParse(raw)
    if (!parsed.success) {
      throw new VehiculoValidationError(parsed.error.message)
    }

    const data = await vehiculoFactory().getAll(parsed.data)
    return ResponseFactory.success(data, "Vehículos obtenidos")
  } catch (err) {
    return ResponseFactory.error(err)
  }
}
