import { Document, model, models, Schema } from "mongoose"

export interface PortadaDocument extends Document {
  name: string
  slug: string
  imageUrl: string
  isActive: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const portadaSchema = new Schema<PortadaDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    imageUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "covers",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

portadaSchema.index({ isActive: 1 })

export const PortadaModel =
  models.Portada || model<PortadaDocument>("Portada", portadaSchema)
