import { PortadaService } from "@/interfaces/application/portada/portada.service"
import { MongoosePortadaRepository } from "@/interfaces/infrastructure/database/portada/portada.repository"
import { PortadaModel } from "@/interfaces/infrastructure/database/portada/portada.schema"
import { DIContainer } from "./container"

export function portadaFactory(): PortadaService {
  const container = DIContainer.getInstance()

  if (!container.has("IPortadaRepository")) {
    container.register(
      "IPortadaRepository",
      new MongoosePortadaRepository(PortadaModel)
    )
  }

  return new PortadaService(container.get("IPortadaRepository"))
}
