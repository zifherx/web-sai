import { DomainError } from "@/shared/domain/domain.error"

export class LeadCorporativoNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Lead corporativo "${id}" no encontrado`, 404)
  }
}

export class LeadCorporativoUnauthorizedError extends DomainError {
  constructor() {
    super("No autorizado", 401)
  }
}
