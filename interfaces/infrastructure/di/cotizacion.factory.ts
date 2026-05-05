import { CotizacionService } from "@/interfaces/application"
import {
  ClienteModel,
  CotizacionModel,
  MongooseClienteRepository,
  MongooseCotizacionRepository,
} from "@/interfaces/infrastructure"

export function cotizacionFactory(): CotizacionService {
  return new CotizacionService(
    new MongooseCotizacionRepository(CotizacionModel),
    new MongooseClienteRepository(ClienteModel)
  )
}
