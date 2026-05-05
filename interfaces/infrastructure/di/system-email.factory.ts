import { SystemEmailService } from "@/interfaces/application"
import {
  MongooseSystemEmailRepository,
  SystemEmailModel,
} from "@/interfaces/infrastructure"

export function systemEmailFactory(): SystemEmailService {
  return new SystemEmailService(
    new MongooseSystemEmailRepository(SystemEmailModel)
  )
}
