import type {
  EntityType,
  FieldName,
} from "@/modules/media/domain/entities/MediaFile"
import { Document, model, models, Schema } from "mongoose"

export interface MediaRecordDocument extends Document {
  fileKey: string
  fileUrl: string
  fileName: string
  fileSize: number
  fileType: string
  entityType: EntityType
  entityId: string
  fieldName: FieldName
  uploadedBy: string
  createdAt: Date
  updatedAt: Date
}

const mediaRecordSchema = new Schema<MediaRecordDocument>(
  {
    fileKey: { type: String, required: true, unique: true, trim: true },
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true, trim: true },
    fileSize: { type: Number, required: true, min: 0 },
    fileType: { type: String, required: true },
    entityType: {
      type: String,
      enum: ["marca", "portada", "sede", "vehiculo", "unassigned"],
      default: "unassigned",
    },
    entityId: { type: String, default: "" },
    fieldName: { type: String, default: "" },
    uploadedBy: { type: String, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "media_records",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

mediaRecordSchema.index({ entityType: 1, entityId: 1 })
mediaRecordSchema.index({ uploadedBy: 1 })
mediaRecordSchema.index({ createdAt: -1 })

export const MediaRecordModel =
  models.MediaRecord ||
  model<MediaRecordDocument>("MediaRecord", mediaRecordSchema)
