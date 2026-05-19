import { CarroceriaService } from "@/modules/application"
import {
  CarroceriaModel,
  MongooseCarroceriaRepository,
} from "@/modules/infrastructure"

export function carroceriaFactory(): CarroceriaService {
  return new CarroceriaService(
    new MongooseCarroceriaRepository(CarroceriaModel)
  )
}
