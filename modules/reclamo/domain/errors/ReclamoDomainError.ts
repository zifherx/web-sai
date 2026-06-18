import { DomainError } from "@/shared/domain/domain.error"

export class ReclamoNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Reclamo "${id}" no encontrado`, 404)
  }
}

export class ReclamoUnauthorizedError extends DomainError {
  constructor() {
    super("No autorizado", 401)
  }
}
