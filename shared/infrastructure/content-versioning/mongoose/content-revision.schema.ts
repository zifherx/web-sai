import { CONTENT_ENTITY_TYPES } from "@/shared/domain/content-versioning/content-revision"
import {
  ContentAuthorDoc,
  contentAuthorSubSchema,
  SeoMetaDoc,
  seoMetaSubSchema,
} from "@/shared/infrastructure/content-versioning/mongoose/versioned-content.subschema"
import { model, models, Schema, Types, type Model } from "mongoose"

/** Forma persistida (Mongoose 9: interfaz plana, sin extender `Document`). */
export interface ContentRevisionFields {
  entityType: (typeof CONTENT_ENTITY_TYPES)[number]
  entityId: Types.ObjectId
  version: number
  title: string
  content: Record<string, unknown>
  plainText: string
  seo: SeoMetaDoc | null
  operational: {
    validFrom: Date | null
    validTo: Date | null
    isActive: boolean
  } | null
  publishedAt: Date
  publishedBy: ContentAuthorDoc
  note: string | null
}

const operationalSubSchema = new Schema(
  {
    validFrom: { type: Date, default: null },
    validTo: { type: Date, default: null },
    isActive: { type: Boolean, required: true },
  },
  { _id: false }
)

const contentRevisionSchema = new Schema<ContentRevisionFields>(
  {
    entityType: { type: String, enum: CONTENT_ENTITY_TYPES, required: true },
    entityId: { type: Schema.Types.ObjectId, required: true },
    version: { type: Number, required: true, min: 1 },
    title: { type: String, required: true },
    content: { type: Schema.Types.Mixed, required: true },
    plainText: { type: String, default: "" },
    seo: { type: seoMetaSubSchema, default: null },
    operational: { type: operationalSubSchema, default: null },
    publishedAt: { type: Date, required: true },
    publishedBy: { type: contentAuthorSubSchema, required: true },
    note: { type: String, default: null, maxlength: 300 },
  },
  {
    versionKey: false,
    minimize: false,
    collection: "content_revisions",
    // Inmutable: solo `createdAt`.
    timestamps: { createdAt: true, updatedAt: false },
  }
)

contentRevisionSchema.index(
  { entityType: 1, entityId: 1, version: -1 },
  { unique: true }
)

export type ContentRevisionLean = ContentRevisionFields & {
  _id: Types.ObjectId
}

export const ContentRevisionModel: Model<ContentRevisionFields> =
  (models.ContentRevision as Model<ContentRevisionFields> | undefined) ??
  model<ContentRevisionFields>("ContentRevision", contentRevisionSchema)
