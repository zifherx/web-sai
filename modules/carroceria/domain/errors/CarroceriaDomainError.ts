import { DomainError } from "@/shared/domain/domain.error"

export class CarroceriaNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Carrocería "${id}" no encontrada`, 404)
  }
}

export class CarroceriaAlreadyExistsError extends DomainError {
  constructor(slug: string) {
    super(`Ya existe una carrocería con el slug "${slug}"`, 409)
  }
}

export class CarroceriaUnauthorizedError extends DomainError {
  constructor() {
    super(`No autorizado`, 401)
  }
}

export class CarroceriaValidationError extends DomainError {
  constructor(message: string) {
    super(message, 422)
  }
}
