import { DomainError } from "@/shared/domain/domain.error"

export class UnauthorizedError extends DomainError {
  constructor() {
    super("Debes iniciar sesión para realizar esta acción", 401)
  }
}

export class ForbiddenError extends DomainError {
  constructor() {
    super("No tienes permisos para realizar esta acción", 403)
  }
}
