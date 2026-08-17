import { DomainError } from "@/shared/domain/domain.error"

export class CredencialesInvalidasError extends DomainError {
  constructor() {
    super(`Credenciales inválidas`, 401)
  }
}

export class SesionExpiradaError extends DomainError {
  constructor() {
    super(`La sesión ha expirado`, 401)
  }
}

export class UsuarioNoEncontradoError extends DomainError {
  constructor(id: string) {
    super(`Usuario "${id}" no encontrado en el dominio`, 404)
  }
}

export class UsuarioYaExisteError extends DomainError {
  constructor(email: string) {
    super(`Ya existe un usuario con el correo "${email}"`, 409)
  }
}

export class SeedNoAutorizadoError extends DomainError {
  constructor() {
    super("No autorizado para ejecutar el seed", 401)
  }
}

export class SeedYaEjecutadoError extends DomainError {
  constructor() {
    super(
      "Ya existe al menos un usuario — el seed no puede volver a ejecutarse",
      409
    )
  }
}
