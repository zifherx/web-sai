import { SedeService } from "@/modules/application"
import {
  MarcaModel,
  MongooseMarcaRepository,
  MongooseSedeRepository,
  SedeModel,
} from "@/modules/infrastructure"

export function sedeFactory(): SedeService {
  return new SedeService(
    new MongooseSedeRepository(SedeModel),
    new MongooseMarcaRepository(MarcaModel)
  )
}
