import { ReclamoService } from "@/interfaces/application"
import {
  MongooseReclamoRepository,
  ReclamoModel,
} from "@/interfaces/infrastructure"

export function reclamoFactory(): ReclamoService {
  return new ReclamoService(new MongooseReclamoRepository(ReclamoModel))
}
