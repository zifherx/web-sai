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

export class CotizacionNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Cotización "${id}" no encontrada`, 404)
  }
}

export class CotizacionValidationError extends DomainError {
  constructor(message: string) {
    super(message, 422)
  }
}
