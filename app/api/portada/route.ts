import { connectDB } from "@/interfaces/infrastructure/database/connection"
import { portadaFactory } from "@/interfaces/infrastructure/di/portada.factory"
import { ResponseFactory } from "@/lib/response-factory"
import { type NextRequest } from "next/server"

export async function GET(req: NextRequest): Promise<Response> {
  try {
    await connectDB()
    const filter = Object.fromEntries(req.nextUrl.searchParams)
    const data = await portadaFactory().getAll(filter)
    return ResponseFactory.success(data, "Portadas obtenidas")
  } catch (err) {
    return ResponseFactory.error(err)
  }
}
