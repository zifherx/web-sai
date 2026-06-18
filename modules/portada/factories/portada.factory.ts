import { CreatePortadaUseCase } from "@/modules/portada/application/use-cases/create-portada.use-case"
import { DeletePortadaUseCase } from "@/modules/portada/application/use-cases/delete-portada.use-case"
import { GetActivePortadasUseCase } from "@/modules/portada/application/use-cases/get-active-portadas.use-case"
import { GetAllPortadasUseCase } from "@/modules/portada/application/use-cases/get-all-portadas.use-case"
import { GetPortadaByIdUseCase } from "@/modules/portada/application/use-cases/get-portada-by-id.use-case"
import { UpdatePortadaUseCase } from "@/modules/portada/application/use-cases/update-portada.use-case"
import { MongoosePortadaRepository } from "@/modules/portada/infrastructure/mongoose/MongoosePortadaRepository"
import { PortadaModel } from "@/modules/portada/infrastructure/mongoose/portada.schema"

export function portadaFactory() {
  const repository = new MongoosePortadaRepository(PortadaModel)

  return {
    getAll: new GetAllPortadasUseCase(repository),
    getActive: new GetActivePortadasUseCase(repository),
    getById: new GetPortadaByIdUseCase(repository),
    create: new CreatePortadaUseCase(repository),
    update: new UpdatePortadaUseCase(repository),
    delete: new DeletePortadaUseCase(repository),
  }
}
