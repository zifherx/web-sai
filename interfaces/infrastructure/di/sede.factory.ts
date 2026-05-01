import { SedeService } from "@/interfaces/application/sede/sede.service"
import { MongooseSedeRepository } from "@/interfaces/infrastructure/database/sede/sede.repository"
import { SedeModel } from "@/interfaces/infrastructure/database/sede/sede.schema"
import { DIContainer } from "./container"

export function sedeFactory(): SedeService {
  const container = DIContainer.getInstance()

  if (!container.has("ISedeRepository")) {
    container.register("ISedeRepository", new MongooseSedeRepository(SedeModel))
  }

  return new SedeService(container.get("ISedeRepository"))
}
