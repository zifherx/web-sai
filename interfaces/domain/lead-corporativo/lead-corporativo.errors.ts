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

export class LeadCorporativoNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Lead corporativo "${id}" no encontrado`, 404)
  }
}

export class LeadCorporativoValidationError extends DomainError {
  constructor(message: string) {
    super(message, 422)
  }
}
