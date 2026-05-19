import { CitaService } from "@/modules/application"
import {
  CitaModel,
  ClienteModel,
  MongooseCitaRepository,
  MongooseClienteRepository,
} from "@/modules/infrastructure"

export function citaFactory(): CitaService {
  return new CitaService(
    new MongooseCitaRepository(CitaModel),
    new MongooseClienteRepository(ClienteModel)
  )
}
