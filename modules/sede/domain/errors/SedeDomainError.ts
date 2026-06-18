import { DomainError } from "@/shared/domain/domain.error"

export class SedeNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Sede con id "${id}" no encontrada`, 404)
  }
}

export class SedeAlreadyExistsError extends DomainError {
  constructor(slug: string) {
    super(`Ya existe una sede con el slug "${slug}"`, 409)
  }
}

export class SedeUnauthorizedError extends DomainError {
  constructor() {
    super("No Autorizado", 401)
  }
}
