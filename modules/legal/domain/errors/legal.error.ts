import { DomainError } from "@/shared/domain/domain.error"

export class LegalPageNotFoundError extends DomainError {
  constructor(slug: string) {
    super(`Página legal "${slug}" no encontrada`, 404)
  }
}

export class LegalPromotionNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Campaña "${id}" no encontrada`, 404)
  }
}

export class LegalPromotionSlugTakenError extends DomainError {
  constructor(slug: string) {
    super(`Ya existe una campaña con el slug "${slug}"`, 409)
  }
}

export class InvalidValidityRangeError extends DomainError {
  constructor() {
    super(
      "La fecha de inicio de vigencia no puede ser posterior a la fecha de fin",
      422
    )
  }
}

export class InvalidPromotionOrderError extends DomainError {
  constructor() {
    super("El nuevo orden debe incluir exactamente todas las campañas", 422)
  }
}

export class LegalSeedUnauthorizedError extends DomainError {
  constructor() {
    super("No autorizado para ejecutar el seed de contenido legal", 401)
  }
}
