import { CreateLeadCorporativoUseCase } from "@/modules/lead-corporativo/application/use-case/create-leadcorporativo.use-case"
import { GetAllLeadsCorporativosUseCase } from "@/modules/lead-corporativo/application/use-case/get-all-leadscorporativos.use-case"
import { GetLeadCorporativoByIdUseCase } from "@/modules/lead-corporativo/application/use-case/get-leadcorporativo-by-id.use-case"
import { MongooseLeadCorporativoRepository } from "@/modules/lead-corporativo/infrastructure/mongoose/MongooseLeadCorporativoRepository"
import { LeadCorporativoModel } from "@/modules/lead-corporativo/infrastructure/mongoose/MongooseLeadCorporativoSchema"

export function leadCorporativoFactory() {
  const repository = new MongooseLeadCorporativoRepository(LeadCorporativoModel)

  return {
    getAll: new GetAllLeadsCorporativosUseCase(repository),
    getById: new GetLeadCorporativoByIdUseCase(repository),
    create: new CreateLeadCorporativoUseCase(repository),
  }
}
