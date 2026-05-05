import { CarroceriaService } from "@/interfaces/application"
import {
  CarroceriaModel,
  MongooseCarroceriaRepository,
} from "@/interfaces/infrastructure"

export function carroceriaFactory(): CarroceriaService {
  return new CarroceriaService(
    new MongooseCarroceriaRepository(CarroceriaModel)
  )
}
