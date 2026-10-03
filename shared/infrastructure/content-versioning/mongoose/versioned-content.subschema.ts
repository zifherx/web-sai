import { Schema } from "mongoose"

// ── Tipos del documento persistido ───────────────────────────────────────────

export interface ContentAuthorDoc {
  userId: string
  name: string
}

export interface SeoMetaDoc {
  title: string
  description: string
}

export interface ContentDraftDoc {
  title: string
  content: Record<string, unknown>
  plainText: string
  seo: SeoMetaDoc | null
  updatedAt: Date
  updatedBy: ContentAuthorDoc
}

export interface ContentPublicationDoc {
  title: string
  content: Record<string, unknown>
  plainText: string
  seo: SeoMetaDoc | null
  version: number
  publishedAt: Date
  publishedBy: ContentAuthorDoc
}

/** Campos que cualquier documento versionado agrega a su schema. */
export interface VersionedContentDocFields {
  draft: ContentDraftDoc
  published: ContentPublicationDoc | null
  lockVersion: number
}

// ── Sub-schemas ──────────────────────────────────────────────────────────────

/**
 * `minimize: false` es OBLIGATORIO: el JSON de Tiptap contiene objetos
 * vacíos (`attrs: {}`) y Mongoose los eliminaría por defecto, lo que haría
 * que un borrador idéntico al publicado se detecte como "con cambios".
 * Aplicarlo también en el schema padre.
 */
const subOptions = { _id: false, minimize: false } as const

export const contentAuthorSubSchema = new Schema<ContentAuthorDoc>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
  },
  subOptions
)

export const seoMetaSubSchema = new Schema<SeoMetaDoc>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  subOptions
)

export const contentDraftSubSchema = new Schema<ContentDraftDoc>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: Schema.Types.Mixed, required: true },
    plainText: { type: String, default: "" },
    seo: { type: seoMetaSubSchema, default: null },
    updatedAt: { type: Date, required: true },
    updatedBy: { type: contentAuthorSubSchema, required: true },
  },
  subOptions
)

export const contentPublicationSubSchema = new Schema<ContentPublicationDoc>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: Schema.Types.Mixed, required: true },
    plainText: { type: String, default: "" },
    seo: { type: seoMetaSubSchema, default: null },
    version: { type: Number, required: true, min: 1 },
    publishedAt: { type: Date, required: true },
    publishedBy: { type: contentAuthorSubSchema, required: true },
  },
  subOptions
)

/** Spread en la definición del schema padre: `{ ...versionedContentFields, ... }`. */
export const versionedContentFields = {
  draft: { type: contentDraftSubSchema, required: true },
  published: { type: contentPublicationSubSchema, default: null },
  lockVersion: { type: Number, default: 0, min: 0 },
}
