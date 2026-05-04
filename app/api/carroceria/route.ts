import { connectDB } from "@/interfaces/infrastructure/database"
import { carroceriaFactory } from "@/interfaces/infrastructure/di"
import { ResponseFactory } from "@/lib"
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
