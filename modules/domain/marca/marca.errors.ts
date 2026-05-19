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

export class MarcaValidationError extends DomainError {
  constructor(message: string) {
    super(message, 422)
  }
}
