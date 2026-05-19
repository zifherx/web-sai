import { SystemEmailService } from "@/modules/application"
import {
  MongooseSystemEmailRepository,
  SystemEmailModel,
} from "@/modules/infrastructure"

export function systemEmailFactory(): SystemEmailService {
  return new SystemEmailService(
    new MongooseSystemEmailRepository(SystemEmailModel)
  )
}
