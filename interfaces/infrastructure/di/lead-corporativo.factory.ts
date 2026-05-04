import { LeadCorporativoService } from "@/interfaces/application/lead-corporativo/lead-corporativo.service"
import { MongooseLeadCorporativoRepository } from "@/interfaces/infrastructure/database/lead-corporativo/lead-corporativo.repository"
import { LeadCorporativoModel } from "@/interfaces/infrastructure/database/lead-corporativo/lead-corporativo.schema"

export function leadCorporativoFactory(): LeadCorporativoService {
  return new LeadCorporativoService(
    new MongooseLeadCorporativoRepository(LeadCorporativoModel)
  )
}
