import { MarcaService } from "@/interfaces/application"
import {
  MarcaModel,
  MongooseMarcaRepository,
} from "@/interfaces/infrastructure"

export function marcaFactory(): MarcaService {
  return new MarcaService(new MongooseMarcaRepository(MarcaModel))
}
