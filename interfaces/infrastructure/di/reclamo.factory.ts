import { ReclamoService } from "@/interfaces/application/reclamo/reclamo.service"
import { MongooseReclamoRepository } from "@/interfaces/infrastructure/database/reclamo/reclamo.repository"
import { ReclamoModel } from "@/interfaces/infrastructure/database/reclamo/reclamo.schema"
import { DIContainer } from "./container"

export function reclamoFactory(): ReclamoService {
  const container = DIContainer.getInstance()

  if (!container.has("IReclamoRepository")) {
    container.register(
      "IReclamoRepository",
      new MongooseReclamoRepository(ReclamoModel)
    )
  }

  return new ReclamoService(container.get("IReclamoRepository"))
}
