import { CreateMarcaUseCase } from "@/modules/marca/application/use-cases/create-marca.use-case"
import { DeleteMarcaUseCase } from "@/modules/marca/application/use-cases/delete-marca.use-case"
import { GetActiveMarcasUseCase } from "@/modules/marca/application/use-cases/get-active-marcas.use-case"
import { GetAllMarcasUseCase } from "@/modules/marca/application/use-cases/get-all-marcas.use-case"
import { GetMarcaByIdUseCase } from "@/modules/marca/application/use-cases/get-marca-by-id.use-case"
import { GetMarcaBySlugUseCase } from "@/modules/marca/application/use-cases/get-marca-by-slug.use-case"
import { UpdateMarcaUseCase } from "@/modules/marca/application/use-cases/update-marca.use-case"
import { MarcaModel } from "@/modules/marca/infrastructure/mongoose/Marca.schema"
import { MongooseMarcaRepository } from "@/modules/marca/infrastructure/mongoose/MongooseMarcaRepository"

export function marcaFactory() {
  const repository = new MongooseMarcaRepository(MarcaModel)
  return {
    getAll: new GetAllMarcasUseCase(repository),
    getActive: new GetActiveMarcasUseCase(repository),
    getById: new GetMarcaByIdUseCase(repository),
    getBySlug: new GetMarcaBySlugUseCase(repository),
    create: new CreateMarcaUseCase(repository),
    update: new UpdateMarcaUseCase(repository),
    delete: new DeleteMarcaUseCase(repository),
  }
}
