import { Document, model, models, Schema } from "mongoose"

export interface SystemEmailDocument extends Document {
  area: string
  email: string
  isActive: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const systemEmailSchema = new Schema<SystemEmailDocument>(
  {
    area: { type: String, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "systememails",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

systemEmailSchema.index({ area: 1, isActive: 1 })

export const SystemEmailModel =
  models.SystemEmail ||
  model<SystemEmailDocument>("SystemEmail", systemEmailSchema)
