import { MarcaService } from "@/interfaces/application/marca/marca.service"
import { MongooseMarcaRepository } from "@/interfaces/infrastructure/database/marca/marca.repository"
import { MarcaModel } from "@/interfaces/infrastructure/database/marca/marca.schema"
import { DIContainer } from "./container"

export function marcaFactory(): MarcaService {
  const container = DIContainer.getInstance()

  if (!container.has("IMarcaRepository")) {
    container.register(
      "IMarcaRepository",
      new MongooseMarcaRepository(MarcaModel)
    )
  }

  return new MarcaService(container.get("IMarcaRepository"))
}
