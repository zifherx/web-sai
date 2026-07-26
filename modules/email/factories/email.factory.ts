import { SendLeadCorporativoEmailUseCase } from "@/modules/email/application/use-cases/send-lead-corporativo-email.use-case"
import { SendReclamoEmailUseCase } from "@/modules/email/application/use-cases/send-reclamo-email.use-case"
import { ResendEmailAdapter } from "@/modules/email/infrastructure/adapters/resend-email.adapter"
import { MongooseSystemEmailRepository } from "@/modules/system-email/infrastructure/mongoose/MongooseSystemEmailRepository"
import { SystemEmailModel } from "@/modules/system-email/infrastructure/mongoose/MongooseSystemEmailSchema"

/**
 * Composition root del módulo Email.
 *
 * Dos dependencias compartidas entre todos los use-cases:
 * - `emailAdapter`: adaptador de salida Resend (IEmailPort)
 * - `systemEmailRepository`: para resolver emails de área (ISystemEmailRepository)
 */
export function emailFactory() {
  const emailAdapter = new ResendEmailAdapter()
  const systemEmailRepository = new MongooseSystemEmailRepository(
    SystemEmailModel
  )

  return {
    sendLeadCorporativo: new SendLeadCorporativoEmailUseCase(
      emailAdapter,
      systemEmailRepository
    ),
    sendReclamo: new SendReclamoEmailUseCase(
      emailAdapter,
      systemEmailRepository
    ),
  }
}
