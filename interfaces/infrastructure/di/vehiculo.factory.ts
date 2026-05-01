import { VehiculoService } from "@/interfaces/application/vehiculo/vehiculo.service"
import { MongooseVehiculoRepository } from "@/interfaces/infrastructure/database/vehiculo/vehiculo.repository"
import { VehiculoModel } from "@/interfaces/infrastructure/database/vehiculo/vehiculo.schema"
import { DIContainer } from "./container"

export function vehiculoFactory(): VehiculoService {
  const container = DIContainer.getInstance()

  if (!container.has("IVehiculoRepository")) {
    container.register(
      "IVehiculoRepository",
      new MongooseVehiculoRepository(VehiculoModel)
    )
  }

  return new VehiculoService(container.get("IVehiculoRepository"))
}
