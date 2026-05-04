import { CotizacionService } from "@/interfaces/application/cotizacion/cotizacion.service"
import { MongooseClienteRepository } from "@/interfaces/infrastructure/database/cliente/cliente.repository"
import { ClienteModel } from "@/interfaces/infrastructure/database/cliente/cliente.schema"
import { MongooseCotizacionRepository } from "@/interfaces/infrastructure/database/cotizacion/cotizacion.repository"
import { CotizacionModel } from "@/interfaces/infrastructure/database/cotizacion/cotizacion.schema"

export function cotizacionFactory(): CotizacionService {
  const cotizacionRepo = new MongooseCotizacionRepository(CotizacionModel)
  const clienteRepo = new MongooseClienteRepository(ClienteModel)
  return new CotizacionService(cotizacionRepo, clienteRepo)
}
