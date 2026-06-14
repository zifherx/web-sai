import { CreateSystemEmailUseCase } from "@/modules/system-email/application/use-case/create-system-email.use-case"
import { GetAllSystemEmailsUseCase } from "@/modules/system-email/application/use-case/get-all-system-emails.use-case"
import { GetSystemEmailByAreaUseCase } from "@/modules/system-email/application/use-case/get-system-email-by-area.use-case"
import { GetSystemEmailByIdUseCase } from "@/modules/system-email/application/use-case/get-system-email-by-id.use-case"
import { MongooseSystemEmailRepository } from "@/modules/system-email/infrastructure/mongoose/MongooseSystemEmailRepository"
import { SystemEmailModel } from "@/modules/system-email/infrastructure/mongoose/MongooseSystemEmailSchema"

export function systemEmailFactory() {
  const repository = new MongooseSystemEmailRepository(SystemEmailModel)

  return {
    getAll: new GetAllSystemEmailsUseCase(repository),
    getById: new GetSystemEmailByIdUseCase(repository),
    getByArea: new GetSystemEmailByAreaUseCase(repository),
    create: new CreateSystemEmailUseCase(repository),
  }
}
