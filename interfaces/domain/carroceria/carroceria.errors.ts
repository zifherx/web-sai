abstract class DomainError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message)
    this.name = this.constructor.name
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

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

export class UnauthorizedError extends DomainError {
  constructor() {
    super(`No autorizado`, 401)
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message, 422)
  }
}
