import { LeadCorporativoService } from "@/interfaces/application"
import {
  LeadCorporativoModel,
  MongooseLeadCorporativoRepository,
} from "@/interfaces/infrastructure"

export function leadCorporativoFactory(): LeadCorporativoService {
  return new LeadCorporativoService(
    new MongooseLeadCorporativoRepository(LeadCorporativoModel)
  )
}
