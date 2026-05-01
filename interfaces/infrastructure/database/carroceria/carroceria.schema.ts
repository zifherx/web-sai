import { Document, model, models, Schema } from "mongoose"

export interface CarroceriaDocument extends Document {
  name: string
  slug: string
  isActive: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const carroceriaSchema = new Schema<CarroceriaDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "carrocerias",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

export const CarroceriaModel =
  models.Carroceria || model<CarroceriaDocument>("Carroceria", carroceriaSchema)
