import { DomainError } from "@/shared/domain/domain.error"

export class SiteSettingsUnauthorizedError extends DomainError {
  constructor() {
    super("No autorizado", 401)
  }
}

export class SiteSettingsForbiddenError extends DomainError {
  constructor() {
    super("No tienes permiso para modificar la configuración del sitio", 403)
  }
}
