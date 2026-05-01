export abstract class DomainError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message)
    this.name = this.constructor.name
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

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
