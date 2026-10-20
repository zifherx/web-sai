import {
  LEGAL_SLUGS,
  type LegalSlug,
} from "@/modules/legal/domain/entities/legal-page"
import {
  type VersionedContentDocFields,
  versionedContentFields,
} from "@/shared/infrastructure/content-versioning/mongoose/versioned-content.subschema"
import { model, models, Schema, type Types, type Model } from "mongoose"

export interface LegalPageFields extends VersionedContentDocFields {
  slug: LegalSlug
  createdAt: Date
  updatedAt: Date
}

export type LegalPageLean = LegalPageFields & { _id: Types.ObjectId }

const legalPageSchema = new Schema<LegalPageFields>(
  {
    slug: { type: String, enum: LEGAL_SLUGS, required: true, unique: true },
    ...versionedContentFields,
  },
  {
    versionKey: false,
    timestamps: true,
    minimize: false,
    collection: "legal_pages",
  }
)

export const LegalPageModel: Model<LegalPageFields> =
  (models.LegalPage as Model<LegalPageFields> | undefined) ??
  model<LegalPageFields>("LegalPage", legalPageSchema)
