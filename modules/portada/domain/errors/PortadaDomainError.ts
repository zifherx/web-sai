import { DomainError } from "@/shared/domain/domain.error"

export class PortadaNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Portada "${id}" no encontrada`, 404)
  }
}

export class PortadaAlreadyExistsError extends DomainError {
  constructor(slug: string) {
    super(`Ya existe una portada con el slug "${slug}"`, 409)
  }
}

export class PortadaUnauthorizedError extends DomainError {
  constructor() {
    super("No autorizado", 401)
  }
}
