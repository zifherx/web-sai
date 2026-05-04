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

export class CitaNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Cita "${id}" no encontrada`, 404)
  }
}

export class CitaValidationError extends DomainError {
  constructor(message: string) {
    super(message, 422)
  }
}

export class MarcaNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Marca "${id}" no encontrada`, 404)
  }
}

export class SedeNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Sede "${id}" no encontrada`, 404)
  }
}
