import { PortadaService } from "@/modules/application"
import {
  MongoosePortadaRepository,
  PortadaModel,
} from "@/modules/infrastructure"

export function portadaFactory(): PortadaService {
  return new PortadaService(new MongoosePortadaRepository(PortadaModel))
}
