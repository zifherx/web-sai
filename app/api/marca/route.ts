import { connectDB, marcaFactory } from "@/interfaces/infrastructure"
import { ResponseFactory } from "@/lib"
import { type NextRequest } from "next/server"

export async function GET(req: NextRequest): Promise<Response> {
  try {
    await connectDB()

    const { searchParams } = req.nextUrl
    const slug = searchParams.get("slug")

    if (slug) {
      const data = await marcaFactory().getBySlug(slug)
      return ResponseFactory.success(data, "Marca obtenida")
    }

    const filter = Object.fromEntries(searchParams)
    const data = await marcaFactory().getAll(filter)
    return ResponseFactory.success(data, "Marcas obtenidas")
  } catch (err) {
    return ResponseFactory.error(err)
  }
}
