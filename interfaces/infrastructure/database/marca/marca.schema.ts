import { Document, model, models, Schema } from "mongoose"

export interface MarcaDocument extends Document {
  name: string
  slug: string
  imageUrl: string
  idNovaly: number
  isActive: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const marcaSchema = new Schema<MarcaDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    imageUrl: { type: String, required: true },
    idNovaly: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "marcas",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

export const MarcaModel =
  models.Marca || model<MarcaDocument>("Marca", marcaSchema)
