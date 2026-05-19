import { LeadCorporativoService } from "@/modules/application"
import {
  LeadCorporativoModel,
  MongooseLeadCorporativoRepository,
} from "@/modules/infrastructure"

export function leadCorporativoFactory(): LeadCorporativoService {
  return new LeadCorporativoService(
    new MongooseLeadCorporativoRepository(LeadCorporativoModel)
  )
}
