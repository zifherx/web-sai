import { CitaService } from "@/interfaces/application"
import {
  CitaModel,
  ClienteModel,
  MongooseCitaRepository,
  MongooseClienteRepository,
} from "@/interfaces/infrastructure"

export function citaFactory(): CitaService {
  return new CitaService(
    new MongooseCitaRepository(CitaModel),
    new MongooseClienteRepository(ClienteModel)
  )
}
