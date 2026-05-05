import { connectDB, systemEmailFactory } from "@/interfaces/infrastructure"
import { ResponseFactory } from "@/lib"
import { NextRequest } from "next/server"
import z from "zod"

const CreateSystemEmailSchema = z.object({
  area: z.string().min(1),
  email: z.string().email(),
})

export async function GET(): Promise<Response> {
  try {
    await connectDB()
    const data = await systemEmailFactory().getAll()
    return ResponseFactory.success(data, `${data.length} emails encontrados`)
  } catch (err) {
    return ResponseFactory.error(err)
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    await connectDB()
    // const { userId } = await auth()
    // if (!userId)
    //   return ResponseFactory.error({
    //     message: "No autorizado",
    //     statusCode: 401,
    //     name: "Unauthorized",
    //   })

    const body = await req.json()
    const parsed = CreateSystemEmailSchema.safeParse(body)
    if (!parsed.success) {
      return ResponseFactory.validationError(
        parsed.error.issues[0]?.message ?? "Datos inválidos"
      )
    }

    const data = await systemEmailFactory().create({
      ...parsed.data,
      isActive: true,
      createdBy: "",
    })
    return ResponseFactory.created(data, `Email ${parsed.data.email} creado`)
  } catch (err) {
    return ResponseFactory.error(err)
  }
}
