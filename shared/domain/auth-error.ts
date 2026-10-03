import { DomainError } from "@/shared/domain/domain.error"

/** 401 — el request no trae una sesión válida de better-auth. */
export class UnauthorizedError extends DomainError {
  constructor() {
    super("Debes iniciar sesión para realizar esta acción", 401)
  }
}

/** 403 — hay sesión, pero el rol no tiene el permiso requerido. */
export class ForbiddenError extends DomainError {
  constructor() {
    super("No tienes permisos para realizar esta acción", 403)
  }
}
