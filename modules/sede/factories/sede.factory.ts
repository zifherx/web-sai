import { MarcaModel } from "@/modules/marca/infrastructure/mongoose/Marca.schema"
import { MongooseMarcaRepository } from "@/modules/marca/infrastructure/mongoose/MongooseMarcaRepository"
import { CreateSedeUseCase } from "@/modules/sede/application/use-cases/create-sede.use-case"
import { DeleteSedeUseCase } from "@/modules/sede/application/use-cases/delete-sede.use-case"
import { GetActiveSedesUseCase } from "@/modules/sede/application/use-cases/get-active-sedes.use-case"
import { GetAllSedesUseCase } from "@/modules/sede/application/use-cases/get-all-sedes.use-case"
import { GetSedeByIdUseCase } from "@/modules/sede/application/use-cases/get-sede-by-id.use-case"
import { GetSedeBySlugUseCase } from "@/modules/sede/application/use-cases/get-sede-by-slug.use-case"
import { GetSedesByMarcaUseCase } from "@/modules/sede/application/use-cases/get-sedes-by-marca.use-case"
import { GetTalleresUseCase } from "@/modules/sede/application/use-cases/get-talleres.use-case"
import { UpdateSedeUseCase } from "@/modules/sede/application/use-cases/update-sede.use-case"
import { MongooseSedeRepository } from "@/modules/sede/infrastructure/mongoose/MongooseSedeRepository"
import { SedeModel } from "@/modules/sede/infrastructure/mongoose/sede.schema"

export function sedeFactory() {
  const sedeRepository = new MongooseSedeRepository(SedeModel)
  const marcaRepository = new MongooseMarcaRepository(MarcaModel)

  return {
    getAll: new GetAllSedesUseCase(sedeRepository),
    getActive: new GetActiveSedesUseCase(sedeRepository),
    getById: new GetSedeByIdUseCase(sedeRepository),
    getBySlug: new GetSedeBySlugUseCase(sedeRepository),
    getTalleres: new GetTalleresUseCase(sedeRepository),
    getByMarca: new GetSedesByMarcaUseCase(sedeRepository, marcaRepository),
    create: new CreateSedeUseCase(sedeRepository),
    update: new UpdateSedeUseCase(sedeRepository),
    delete: new DeleteSedeUseCase(sedeRepository),
  }
}
