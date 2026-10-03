import {
  RichContent,
  RichContentProfile,
} from "@/shared/domain/rich-text/rich-content"

export interface ProcessedRichContent {
  /** JSON normalizado: atributos desconocidos descartados. */
  readonly content: RichContent
  /** Texto plano derivado (búsqueda, diff del historial). */
  readonly plainText: string
}

/**
 * Valida y normaliza contenido enriquecido que llega del cliente.
 * Lanza `InvalidRichContentError` si el documento no es válido.
 */
export interface IRichContentProcessor {
  process(input: unknown, profile: RichContentProfile): ProcessedRichContent
}
