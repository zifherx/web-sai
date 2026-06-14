import { DomainError } from "@/shared/domain/domain.error"

export class NovalyApiError extends DomainError {
  constructor(
    message: string,
    statusCode: number,
    public readonly camposFaltantes?: string[]
  ) {
    super(message, statusCode)
  }
}

export class NovalyUnauthorizedError extends DomainError {
  constructor() {
    super("No autorizado", 401)
  }
}
