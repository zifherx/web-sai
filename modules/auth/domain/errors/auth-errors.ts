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
