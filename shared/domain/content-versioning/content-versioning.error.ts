import { DomainError } from "@/shared/domain/domain.error"

export class VersionConflictError extends DomainError {
  constructor() {
    super(
      "El contenido fue modificado por otro usuario. Recarga para ver la última versión.",
      409
    )
  }
}

export class NothingToPublishError extends DomainError {
  constructor() {
    super("No hay cambios pendientes para publicar", 422)
  }
}

export class NothingToDiscardError extends DomainError {
  constructor() {
    super("No hay cambios pendientes para descartar", 422)
  }
}

export class ContentRevisionNotFoundError extends DomainError {
  constructor(revisionId: string) {
    super(`Revisión "${revisionId}" no encontrada`, 404)
  }
}
