import { BitacoraService } from "@/modules/application"
import {
  BitacoraModel,
  MongooseBitacoraRepository,
} from "@/modules/infrastructure"

export function bitacoraFactory(): BitacoraService {
  return new BitacoraService(new MongooseBitacoraRepository(BitacoraModel))
}
