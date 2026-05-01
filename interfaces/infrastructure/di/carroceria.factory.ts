import { CarroceriaService } from "@/interfaces/application/carroceria/carroceria.service"
import { MongooseCarroceriaRepository } from "@/interfaces/infrastructure/database/carroceria/carroceria.repository"
import { CarroceriaModel } from "@/interfaces/infrastructure/database/carroceria/carroceria.schema"
import { DIContainer } from "./container"

export function carroceriaFactory(): CarroceriaService {
  const container = DIContainer.getInstance()

  if (!container.has("ICarroceriaRepository")) {
    container.register(
      "ICarroceriaRepository",
      new MongooseCarroceriaRepository(CarroceriaModel)
    )
  }

  return new CarroceriaService(container.get("ICarroceriaRepository"))
}
