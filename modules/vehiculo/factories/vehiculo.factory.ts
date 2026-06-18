import { CreateVehiculoUseCase } from "@/modules/vehiculo/application/use-cases/create-vehiculo.use-case"
import { DeleteVehiculoUseCase } from "@/modules/vehiculo/application/use-cases/delete-vehiculo.use-case"
import { GetActiveVehiculosUseCase } from "@/modules/vehiculo/application/use-cases/get-active-vehiculos.use-case"
import { GetAllVehiculosUseCase } from "@/modules/vehiculo/application/use-cases/get-all-vehiculos.use-case"
import { GetVehiculoByIdUseCase } from "@/modules/vehiculo/application/use-cases/get-vehiculo-by-id.use-case"
import { GetVehiculoBySlugUseCase } from "@/modules/vehiculo/application/use-cases/get-vehiculo-by-slug.use-case"
import { GetVehiculosByMarcaUseCase } from "@/modules/vehiculo/application/use-cases/get-vehiculos-by-marca.use-case"
import { UpdateVehiculoUseCase } from "@/modules/vehiculo/application/use-cases/update-vehiculo.use-case"
import { MongooseVehiculoRepository } from "@/modules/vehiculo/infrastructure/mongoose/MongooseVehiculoRepository"
import { VehiculoModel } from "@/modules/vehiculo/infrastructure/mongoose/MongooseVehiculoSchema"

export function vehiculoFactory() {
  const repository = new MongooseVehiculoRepository(VehiculoModel)

  return {
    getAll: new GetAllVehiculosUseCase(repository),
    getActive: new GetActiveVehiculosUseCase(repository),
    getById: new GetVehiculoByIdUseCase(repository),
    getBySlug: new GetVehiculoBySlugUseCase(repository),
    getByMarca: new GetVehiculosByMarcaUseCase(repository),
    create: new CreateVehiculoUseCase(repository),
    update: new UpdateVehiculoUseCase(repository),
    delete: new DeleteVehiculoUseCase(repository),
  }
}
