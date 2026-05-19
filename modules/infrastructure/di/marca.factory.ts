import { MarcaService } from "@/modules/application"
import { MarcaModel, MongooseMarcaRepository } from "@/modules/infrastructure"

export function marcaFactory(): MarcaService {
  return new MarcaService(new MongooseMarcaRepository(MarcaModel))
}
