import { MongooseClienteRepository } from "@/modules/cliente/infrastructure/mongoose/MongooseClienteRepository"
import { ClienteModel } from "@/modules/cliente/infrastructure/mongoose/MongooseClienteSchema"
import { CreateCotizacionUseCase } from "@/modules/cotizacion/application/use-case/create-cotizacion.use-case"
import { GetAllCotizacionesUseCase } from "@/modules/cotizacion/application/use-case/get-all-cotizaciones.use-case"
import { GetCotizacionByIdUseCase } from "@/modules/cotizacion/application/use-case/get-cotizacion-by-id.use-case"
import { MongooseCotizacionRepository } from "@/modules/cotizacion/infrastructure/mongoose/MongooseCotizacionRepository"
import { CotizacionModel } from "@/modules/cotizacion/infrastructure/mongoose/MongooseCotizacionSchema"

export function cotizacionFactory() {
  const cotizacionRepository = new MongooseCotizacionRepository(CotizacionModel)
  const clienteRepository = new MongooseClienteRepository(ClienteModel)

  return {
    getAll: new GetAllCotizacionesUseCase(cotizacionRepository),
    getById: new GetCotizacionByIdUseCase(cotizacionRepository),
    create: new CreateCotizacionUseCase(
      cotizacionRepository,
      clienteRepository
    ),
  }
}
