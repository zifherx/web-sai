import { CreateReclamoUseCase } from "@/modules/reclamo/application/use-cases/create-reclamo.use-case"
import { GetAllReclamosUseCase } from "@/modules/reclamo/application/use-cases/get-all-reclamos.use-case"
import { GetReclamoByIdUseCase } from "@/modules/reclamo/application/use-cases/get-reclamo-by-id.use-case"
import { MongooseReclamoRepository } from "@/modules/reclamo/infrastructure/mongoose/MongooseReclamoRepository"
import { ReclamoModel } from "@/modules/reclamo/infrastructure/mongoose/MongooseReclamoSchema"

export function reclamoFactory() {
  const repository = new MongooseReclamoRepository(ReclamoModel)

  return {
    getAll: new GetAllReclamosUseCase(repository),
    getById: new GetReclamoByIdUseCase(repository),
    create: new CreateReclamoUseCase(repository),
  }
}
