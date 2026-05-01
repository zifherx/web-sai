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

export class SedeNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Sede con id "${id}" no encontrada`, 404)
  }
}

export class SedeSlugNotFoundError extends DomainError {
  constructor(slug: string) {
    super(`Sede con slug ${slug} no encontrado`, 404)
  }
}

export class SedeAlreadyExistsError extends DomainError {
  constructor(slug: string) {
    super(`Ya existe una sede con el slug "${slug}"`, 409)
  }
}

export class UnauthorizedError extends DomainError {
  constructor() {
    super(`No autorizado`, 401)
  }
}

export class SedeValidationError extends DomainError {
  constructor(message: string) {
    super(message, 422)
  }
}
