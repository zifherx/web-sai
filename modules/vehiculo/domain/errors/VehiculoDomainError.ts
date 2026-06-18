import { DomainError } from "@/shared/domain/domain.error"

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

export class VehiculoUnauthorizedError extends DomainError {
  constructor() {
    super("No autorizado", 401)
  }
}
