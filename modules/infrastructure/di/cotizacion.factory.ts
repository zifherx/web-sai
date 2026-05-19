import { CotizacionService } from "@/modules/application"
import {
  ClienteModel,
  CotizacionModel,
  MongooseClienteRepository,
  MongooseCotizacionRepository,
} from "@/modules/infrastructure"

export function cotizacionFactory(): CotizacionService {
  return new CotizacionService(
    new MongooseCotizacionRepository(CotizacionModel),
    new MongooseClienteRepository(ClienteModel)
  )
}
