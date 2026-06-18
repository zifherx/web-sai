import { DomainError } from "@/shared/domain/domain.error"

export class CitaNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Cita "${id}" no encontrada`, 404)
  }
}

export class CitaUnauthorizedError extends DomainError {
  constructor() {
    super("No autorizado", 401)
  }
}
