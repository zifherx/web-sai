import {
  NothingToDiscardError,
  NothingToPublishError,
  VersionConflictError,
} from "@/shared/domain/content-versioning/content-versioning.error"
import { RichContent } from "@/shared/domain/rich-text/rich-content"

export interface ContentAuthor {
  readonly userId: string
  readonly name: string
}

export interface SeoMeta {
  readonly title: string
  readonly description: string
}

/** Lo que el usuario edita y lo que se publica. */
export interface ContentSnapshot {
  readonly title: string
  readonly content: RichContent
  /** Derivado en servidor. No participa en la comparación de cambios. */
  readonly plainText: string
  readonly seo: SeoMeta | null
}

export interface ContentDraft extends ContentSnapshot {
  readonly updatedAt: Date
  readonly updatedBy: ContentAuthor
}

export interface ContentPublication extends ContentSnapshot {
  /** Número de publicación: 1, 2, 3… */
  readonly version: number
  readonly publishedAt: Date
  readonly publishedBy: ContentAuthor
}

export type PublicationStatus = "unpublished" | "published" | "pending-changes"

/**
 * Value object inmutable: borrador + versión publicada + bloqueo optimista.
 *
 * Reutilizado por páginas legales, campañas y notas legales de vehículos.
 * Toda operación que escribe devuelve una NUEVA instancia con
 * `lockVersion + 1`; el repositorio persiste con el filtro
 * `{ lockVersion: <anterior> }` para detectar escrituras concurrentes.
 */
export class VersionedContent {
  constructor(
    public readonly draft: ContentDraft,
    public readonly published: ContentPublication | null,
    public readonly lockVersion: number
  ) {}

  /** Contenido nuevo, nunca publicado. */
  static createDraft(
    snapshot: ContentSnapshot,
    author: ContentAuthor,
    now: Date
  ): VersionedContent {
    return new VersionedContent(toDraft(snapshot, author, now), null, 0)
  }

  /** Contenido ya publicado como versión 1 (migración inicial). */
  static createPublished(
    snapshot: ContentSnapshot,
    author: ContentAuthor,
    now: Date
  ): VersionedContent {
    return new VersionedContent(
      toDraft(snapshot, author, now),
      toPublication(snapshot, 1, author, now),
      0
    )
  }

  get status(): PublicationStatus {
    if (this.published === null) return "unpublished"
    return this.hasPendingChanges ? "pending-changes" : "published"
  }

  /** El borrador difiere de lo publicado (título, contenido o SEO). */
  get hasPendingChanges(): boolean {
    if (this.published === null) return true
    return !sameSnapshot(this.draft, this.published)
  }

  get nextVersion(): number {
    return (this.published?.version ?? 0) + 1
  }

  /**
   * Falla rápido si el cliente editó sobre una versión desactualizada.
   * (El repositorio vuelve a verificarlo de forma atómica al guardar.)
   */
  assertLockVersion(expected: number): void {
    if (this.lockVersion !== expected) throw new VersionConflictError()
  }

  withDraft(
    snapshot: ContentSnapshot,
    author: ContentAuthor,
    now: Date
  ): VersionedContent {
    return new VersionedContent(
      toDraft(snapshot, author, now),
      this.published,
      this.lockVersion + 1
    )
  }

  /**
   * Copia el borrador a publicado. Devuelve también la publicación creada,
   * que el caso de uso guarda en el historial (`content_revisions`).
   */
  publish(
    author: ContentAuthor,
    now: Date
  ): { versioned: VersionedContent; publication: ContentPublication } {
    if (!this.hasPendingChanges) throw new NothingToPublishError()

    const publication = toPublication(this.draft, this.nextVersion, author, now)
    return {
      versioned: new VersionedContent(
        this.draft,
        publication,
        this.lockVersion + 1
      ),
      publication,
    }
  }

  /** Vuelve el borrador a lo publicado. */
  discardDraft(author: ContentAuthor, now: Date): VersionedContent {
    if (this.published === null || !this.hasPendingChanges) {
      throw new NothingToDiscardError()
    }
    return this.withDraft(this.published, author, now)
  }

  /**
   * Carga una versión anterior como BORRADOR. No publica: el editor revisa
   * y luego publica (queda como una versión nueva en el historial).
   */
  restoreDraft(
    snapshot: ContentSnapshot,
    author: ContentAuthor,
    now: Date
  ): VersionedContent {
    return this.withDraft(snapshot, author, now)
  }
}

// ── Helpers privados ──────────────────────────────────────────────────────────

function pickSnapshot(s: ContentSnapshot): ContentSnapshot {
  return {
    title: s.title,
    content: s.content,
    plainText: s.plainText,
    seo: s.seo ? { title: s.seo.title, description: s.seo.description } : null,
  }
}

function toDraft(
  s: ContentSnapshot,
  author: ContentAuthor,
  now: Date
): ContentDraft {
  return { ...pickSnapshot(s), updatedAt: now, updatedBy: author }
}

function toPublication(
  s: ContentSnapshot,
  version: number,
  author: ContentAuthor,
  now: Date
): ContentPublication {
  return { ...pickSnapshot(s), version, publishedAt: now, publishedBy: author }
}

function sameSnapshot(a: ContentSnapshot, b: ContentSnapshot): boolean {
  const comparable = (s: ContentSnapshot) =>
    stableStringify({ title: s.title, content: s.content, seo: s.seo })
  return comparable(a) === comparable(b)
}

/**
 * JSON con claves ordenadas: el orden de claves que devuelve Mongo puede
 * diferir del que envía el cliente para el mismo documento.
 */
export function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value) ?? "null"
  }
  if (value instanceof Date) return JSON.stringify(value.toISOString())
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`

  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([k, v]) => `${JSON.stringify(k)}:${stableStringify(v)}`)
  return `{${entries.join(",")}}`
}
