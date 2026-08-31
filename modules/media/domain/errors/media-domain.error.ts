import { DomainError } from "@/shared/domain/domain.error"

export class MediaDomainError extends DomainError {
  constructor(message: string, statusCode = 422) {
    super(message, statusCode)
    this.name = "MediaDomainError"
  }
}

export class MediaFileNotFoundError extends MediaDomainError {
  constructor(id: string) {
    super(`Archivo de media no encontrado: ${id}`, 404)
    this.name = "MediaFileNotFoundError"
  }
}

export class MediaFileAlreadyAssignedError extends MediaDomainError {
  constructor(id: string) {
    super(`El archivo "${id}" ya está asignado a una entidad`, 409)
    this.name = "MediaFileAlreadyAssignedError"
  }
}

export class MediaUploadFailedError extends MediaDomainError {
  constructor(fileName: string, reason?: string) {
    super(
      `Falló la subida del archivo "${fileName}"${reason ? `: ${reason}` : ""}`,
      502
    )
    this.name = "MediaUploadFailedError"
  }
}

export class MediaDeleteFailedError extends MediaDomainError {
  constructor(fileKey: string, reason?: string) {
    super(
      `Falló la eliminación del archivo "${fileKey}"${reason ? `: ${reason}` : ""}`,
      502
    )
    this.name = "MediaDeleteFailedError"
  }
}

export class MediaUnauthorizedError extends DomainError {
  constructor() {
    super("No autorizado", 401)
  }
}
