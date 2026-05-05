import { PortadaService } from "@/interfaces/application"
import {
  MongoosePortadaRepository,
  PortadaModel,
} from "@/interfaces/infrastructure"

export function portadaFactory(): PortadaService {
  return new PortadaService(new MongoosePortadaRepository(PortadaModel))
}
