import { VehiculoService } from "@/modules/application"
import {
  MongooseVehiculoRepository,
  VehiculoModel,
} from "@/modules/infrastructure"

export function vehiculoFactory(): VehiculoService {
  return new VehiculoService(new MongooseVehiculoRepository(VehiculoModel))
}
