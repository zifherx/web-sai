import { DomainError } from "@/shared/domain/domain.error"

export type RichContent = { readonly type: "doc" } & Readonly<
  Record<string, unknown>
>

export const RICH_CONTENT_PROFILES = [
  "legal-page",
  "legal-promotion",
  "vehicle-legal-note",
] as const
export type RichContentProfile = (typeof RICH_CONTENT_PROFILES)[number]

export const EMPTY_RICH_CONTENT: RichContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
}

export class InvalidRichContentError extends DomainError {
  constructor(detail: string) {
    super(`Contenido inválido: ${detail}`, 422)
  }
}
