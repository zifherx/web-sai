import {
  ContentAuthor,
  ContentPublication,
  ContentSnapshot,
} from "@/shared/domain/content-versioning/versioned-content"

export const CONTENT_ENTITY_TYPES = [
  "legal-page",
  "legal-promotion",
  "vehicle-legal-note",
] as const
export type ContentEntityType = (typeof CONTENT_ENTITY_TYPES)[number]

/** Campos operativos de una campaña al momento de publicar (auditoría). */
export interface OperationalSnapshot {
  readonly validFrom: Date | null
  readonly validTo: Date | null
  readonly isActive: boolean
}

export interface NewContentRevisionData {
  readonly entityType: ContentEntityType
  readonly entityId: string
  readonly version: number
  readonly snapshot: ContentSnapshot
  readonly publishedAt: Date
  readonly publishedBy: ContentAuthor
  readonly note: string | null
  readonly operational: OperationalSnapshot | null
}

/**
 * Snapshot INMUTABLE de una publicación. Colección `content_revisions`.
 * No existen operaciones de edición ni borrado.
 */
export class ContentRevision {
  constructor(
    public readonly id: string,
    public readonly entityType: ContentEntityType,
    public readonly entityId: string,
    public readonly version: number,
    public readonly snapshot: ContentSnapshot,
    public readonly publishedAt: Date,
    public readonly publishedBy: ContentAuthor,
    public readonly note: string | null,
    public readonly operational: OperationalSnapshot | null
  ) {}

  static fromPublication(
    entityType: ContentEntityType,
    entityId: string,
    publication: ContentPublication,
    note: string | null,
    operational: OperationalSnapshot | null = null
  ): NewContentRevisionData {
    return {
      entityType,
      entityId,
      version: publication.version,
      snapshot: {
        title: publication.title,
        content: publication.content,
        plainText: publication.plainText,
        seo: publication.seo,
      },
      publishedAt: publication.publishedAt,
      publishedBy: publication.publishedBy,
      note,
      operational,
    }
  }

  belongsTo(entityType: ContentEntityType, entityId: string): boolean {
    return this.entityType === entityType && this.entityId === entityId
  }
}
