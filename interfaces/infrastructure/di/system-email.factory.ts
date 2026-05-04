import { SystemEmailService } from "@/interfaces/application/system-email/system-email.service"
import { MongooseSystemEmailRepository } from "@/interfaces/infrastructure/database/system-email/system-email.repository"
import { SystemEmailModel } from "@/interfaces/infrastructure/database/system-email/system-email.schema"

export function systemEmailFactory(): SystemEmailService {
  return new SystemEmailService(
    new MongooseSystemEmailRepository(SystemEmailModel)
  )
}
