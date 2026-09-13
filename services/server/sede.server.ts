import { toGlobalPlain } from "@/lib"
import { sedeFactory } from "@/modules/sede/factories/sede.factory"
import { connectDB } from "@/shared/infrastructure/connection"
import type { ISedeFilters, SedeType } from "@/types"
import "server-only"

export const sedeServerService = {
  getActive: async (
    filters?: Omit<ISedeFilters, "isActive">
  ): Promise<SedeType[]> => {
    await connectDB()
    const { getActive } = sedeFactory()
    const data = await getActive.execute(filters)
    return toGlobalPlain(data)
  },
  getTallers: async (): Promise<SedeType[]> => {
    await connectDB()
    const { getTalleres } = sedeFactory()
    const data = await getTalleres.execute()
    return toGlobalPlain(data)
  },
}
