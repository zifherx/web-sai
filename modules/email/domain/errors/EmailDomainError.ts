import { DomainError } from "@/shared/domain/domain.error"

export class EmailSendError extends DomainError {
  constructor(message: string) {
    super(`Error al enviar email: ${message}`, 500)
  }
}

export class EmailAreaNotConfiguredError extends DomainError {
  constructor(area: string) {
    super(`Email del área "${area}" no configurado en el sistema`, 422)
  }
}

export class EmailUnauthorizedError extends DomainError {
  constructor() {
    super("No autorizado", 401)
  }
}
