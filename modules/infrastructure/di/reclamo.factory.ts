import { ReclamoService } from "@/modules/application"
import {
  MongooseReclamoRepository,
  ReclamoModel,
} from "@/modules/infrastructure"

export function reclamoFactory(): ReclamoService {
  return new ReclamoService(new MongooseReclamoRepository(ReclamoModel))
}
