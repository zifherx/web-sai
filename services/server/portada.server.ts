import { portadaFactory } from "@/modules/portada/factories/portada.factory"
import { connectDB } from "@/shared/infrastructure/connection"
import { PortadaType } from "@/types"
import "server-only"

export const portadaServerService = {
  getActive: async (): Promise<PortadaType[]> => {
    await connectDB()
    const { getActive } = portadaFactory()
    return getActive.execute()
  },
}
