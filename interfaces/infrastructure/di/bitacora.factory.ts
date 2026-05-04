import { BitacoraService } from "@/interfaces/application/bitacora/bitacora.service"
import { MongooseBitacoraRepository } from "@/interfaces/infrastructure/database/bitacora/bitacora.repository"
import { BitacoraModel } from "@/interfaces/infrastructure/database/bitacora/bitacora.schema"

export function bitacoraFactory(): BitacoraService {
  return new BitacoraService(new MongooseBitacoraRepository(BitacoraModel))
}
