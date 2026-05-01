import { connectDB } from "@/interfaces/infrastructure/database/connection"
import { carroceriaFactory } from "@/interfaces/infrastructure/di/carroceria.factory"
import { ResponseFactory } from "@/lib/response-factory"
import { type NextRequest } from "next/server"

export async function GET(req: NextRequest): Promise<Response> {
  try {
    await connectDB()
    const filter = Object.fromEntries(req.nextUrl.searchParams)
    const data = await carroceriaFactory().getAll(filter)
    return ResponseFactory.success(data, "Carrocerías obtenidas")
  } catch (err) {
    return ResponseFactory.error(err)
  }
}
