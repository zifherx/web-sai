import { DomainError } from "@/shared/domain/domain.error"

export class MarcaNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Marca "${id}" no encontrada`, 404)
  }
}

export class MarcaAlreadyExistsError extends DomainError {
  constructor(slug: string) {
    super(`Ya existe una marca con el slug "${slug}"`, 409)
  }
}

export class MarcaUnauthorizedError extends DomainError {
  constructor() {
    super("No autorizado", 401)
  }
}
