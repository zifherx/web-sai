import {
  versionedContentFields,
  type VersionedContentDocFields,
} from "@/shared/infrastructure/content-versioning/mongoose/versioned-content.subschema"
import { model, models, Schema, type Types, type Model } from "mongoose"

export interface LegalPromotionFields extends VersionedContentDocFields {
  slug: string
  validFrom: Date | null
  validTo: Date | null
  isActive: boolean
  order: number
  attachment: { url: string; name: string } | null
  createdAt: Date
  updatedAt: Date
}

export type LegalPromotionLean = LegalPromotionFields & { _id: Types.ObjectId }

const attachmentSubSchema = new Schema(
  {
    url: { type: String, required: true },
    name: { type: String, required: true, trim: true },
  },
  { _id: false }
)

const legalPromotionSchema = new Schema<LegalPromotionFields>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    ...versionedContentFields,
    validFrom: { type: Date, default: null },
    validTo: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
    order: { type: Number, required: true, min: 1 },
    attachment: { type: attachmentSubSchema, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
    minimize: false,
    collection: "legal_promotions",
  }
)

legalPromotionSchema.index({ order: 1 })
legalPromotionSchema.index({ isActive: 1, order: 1 })

export const LegalPromotionModel: Model<LegalPromotionFields> =
  (models.LegalPromotion as Model<LegalPromotionFields> | undefined) ??
  model<LegalPromotionFields>("LegalPromotion", legalPromotionSchema)
