import { DomainError } from "@/shared/domain/domain.error"

export class BitacoraUnauthorizedError extends DomainError {
  constructor() {
    super("No autorizado", 401)
  }
}
