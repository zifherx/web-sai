import { connectDB, sedeFactory } from "@/interfaces/infrastructure"
import { ResponseFactory } from "@/lib"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest): Promise<Response> {
  try {
    await connectDB()

    const { searchParams } = req.nextUrl
    const service = sedeFactory()

    const marcaNombre = searchParams.get("marcaNombre")
    if (marcaNombre) {
      const data = await service.getByMarcaNombre(marcaNombre)
      return ResponseFactory.success(
        data,
        `${data.length} sedes para ${marcaNombre}`
      )
    }

    const slug = searchParams.get("slug")
    if (slug) {
      const data = await service.getBySlug(slug)
      return ResponseFactory.success(data)
    }

    const isActive = searchParams.get("isActive")
    const isTaller = searchParams.get("isTaller")
    const ciudad = searchParams.get("ciudad") ?? undefined
    const marcaVentaId = searchParams.get("marcaVentaId") ?? undefined
    const marcaTallerId = searchParams.get("marcaTallerId") ?? undefined

    const filters = {
      isActive: isActive !== null ? isActive === "true" : undefined,
      isTaller: isTaller !== null ? isTaller === "true" : undefined,
      ciudad,
      marcaVentaId,
      marcaTallerId,
    }

    const data = await service.getAll(filters)
    return ResponseFactory.success(data, `${data.length} sedes obtenidas`)
  } catch (err) {
    return ResponseFactory.error(err)
  }
}
