import { DomainError } from "@/shared/domain/domain.error"

/** 409 — el `lockVersion` enviado no coincide: otro usuario guardó antes. */
export class VersionConflictError extends DomainError {
  constructor() {
    super(
      "El contenido fue modificado por otro usuario. Recarga para ver la última versión.",
      409
    )
  }
}

/** 422 — el borrador es idéntico a lo publicado. */
export class NothingToPublishError extends DomainError {
  constructor() {
    super("No hay cambios pendientes para publicar", 422)
  }
}

/** 422 — no hay versión publicada a la cual volver, o no hay cambios. */
export class NothingToDiscardError extends DomainError {
  constructor() {
    super("No hay cambios pendientes para descartar", 422)
  }
}

/** 404 — la revisión no existe o no pertenece a la entidad indicada. */
export class ContentRevisionNotFoundError extends DomainError {
  constructor(revisionId: string) {
    super(`Revisión "${revisionId}" no encontrada`, 404)
  }
}
