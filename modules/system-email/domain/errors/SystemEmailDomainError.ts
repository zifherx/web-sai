import { DomainError } from "@/shared/domain/domain.error"

export class SystemEmailNotFoundError extends DomainError {
  constructor(identifier: string) {
    super(`Email de sistema "${identifier}" no encontrado`, 404)
  }
}

export class SystemEmailUnauthorizedError extends DomainError {
  constructor() {
    super("No autorizado", 401)
  }
}
