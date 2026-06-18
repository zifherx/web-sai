import { CreateCarroceriaUseCase } from "@/modules/carroceria/application/use-cases/create-carroceria.use-case"
import { DeleteCarroceriaUseCase } from "@/modules/carroceria/application/use-cases/delete-carroceria.use-case"
import { GetActiveCarroceriasUseCase } from "@/modules/carroceria/application/use-cases/get-active-carrocerias.use-case"
import { GetAllCarroceriasUseCase } from "@/modules/carroceria/application/use-cases/get-all-carrocerias.use-case"
import { GetCarroceriaByIdUseCase } from "@/modules/carroceria/application/use-cases/get-carroceria-by-id.use-case"
import { UpdateCarroceriaUseCase } from "@/modules/carroceria/application/use-cases/update-carroceria.use-case"
import { MongooseCarroceriaRepository } from "@/modules/carroceria/infrastructure/mongoose/MongooseCarroceriaRepository"
import { CarroceriaModel } from "@/modules/carroceria/infrastructure/mongoose/MongooseCarroceriaSchema"

export function carroceriaFactory() {
  const repository = new MongooseCarroceriaRepository(CarroceriaModel)

  return {
    getAll: new GetAllCarroceriasUseCase(repository),
    getActive: new GetActiveCarroceriasUseCase(repository),
    getById: new GetCarroceriaByIdUseCase(repository),
    create: new CreateCarroceriaUseCase(repository),
    update: new UpdateCarroceriaUseCase(repository),
    delete: new DeleteCarroceriaUseCase(repository),
  }
}
