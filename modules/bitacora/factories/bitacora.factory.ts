import { GetAllBitacorasUseCase } from "@/modules/bitacora/application/use-case/get-all-bitacoras.use-case"
import { IBitacoraLogPort } from "@/modules/bitacora/domain/repositories/IBitacoraRepository"
import { BitacoraLogger } from "@/modules/bitacora/infrastructure/logger/BitacoraLogger"
import { MongooseBitacoraRepository } from "@/modules/bitacora/infrastructure/mongoose/MongooseBitacoraRepository"
import { BitacoraModel } from "@/modules/bitacora/infrastructure/mongoose/MongooseBitacoraSchema"

export function bitacoraFactory() {
  const repository = new MongooseBitacoraRepository(BitacoraModel)
  return {
    getAll: new GetAllBitacorasUseCase(repository),
  }
}

export function createBitacoraLogger(): IBitacoraLogPort {
  const repository = new MongooseBitacoraRepository(BitacoraModel)
  return new BitacoraLogger(repository)
}
