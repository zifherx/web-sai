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

export class VehiculoNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Vehículo "${id}" no encontrado`, 404)
  }
}

export class VehiculoSlugNotFoundError extends DomainError {
  constructor(slug: string) {
    super(`Vehículo con slug ${slug} no encontrado`, 404)
  }
}

export class VehiculoAlreadyExistsError extends DomainError {
  constructor(slug: string) {
    super(`Ya existe un vehículo con el slug "${slug}"`, 409)
  }
}

export class VehiculoValidationError extends DomainError {
  constructor(message: string) {
    super(message, 422)
  }
}
