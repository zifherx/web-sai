import { MediaDomainError } from "@/modules/media/domain/errors/MediaDomainError"

export class FileKey {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(raw: string): FileKey {
    const trimmed = raw?.trim()
    if (!trimmed) {
      throw new MediaDomainError("FileKey no puede estar vacío")
    }
    return new FileKey(trimmed)
  }

  toString(): string {
    return this.value
  }

  equals(other: FileKey): boolean {
    return this.value === other.value
  }
}
