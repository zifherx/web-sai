import { BitacoraService } from "@/interfaces/application"
import {
  BitacoraModel,
  MongooseBitacoraRepository,
} from "@/interfaces/infrastructure"

export function bitacoraFactory(): BitacoraService {
  return new BitacoraService(new MongooseBitacoraRepository(BitacoraModel))
}
