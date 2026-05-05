import { SedeService } from "@/interfaces/application"
import {
  MarcaModel,
  MongooseMarcaRepository,
  MongooseSedeRepository,
  SedeModel,
} from "@/interfaces/infrastructure"

export function sedeFactory(): SedeService {
  return new SedeService(
    new MongooseSedeRepository(SedeModel),
    new MongooseMarcaRepository(MarcaModel)
  )
}
