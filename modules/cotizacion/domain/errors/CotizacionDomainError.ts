import { DomainError } from "@/shared/domain/domain.error"

export class CotizacionNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Cotización "${id}" no encontrada`, 404)
  }
}

export class CotizacionUnauthorizedError extends DomainError {
  constructor() {
    super("No autorizado", 401)
  }
}
