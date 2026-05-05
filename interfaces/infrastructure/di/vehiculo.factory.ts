import { VehiculoService } from "@/interfaces/application"
import {
  MongooseVehiculoRepository,
  VehiculoModel,
} from "@/interfaces/infrastructure"

export function vehiculoFactory(): VehiculoService {
  return new VehiculoService(new MongooseVehiculoRepository(VehiculoModel))
}
