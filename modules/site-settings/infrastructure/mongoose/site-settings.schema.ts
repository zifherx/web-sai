import { Document, model, Model, models, Schema, Types } from "mongoose"

/** Clave del documento único. Se usa `key` en vez de depender de un _id fijo. */
export const SITE_SETTINGS_KEY = "global"

export interface SiteSettingsDocument extends Document {
  key: string
  maintenanceMode: boolean
  maintenanceMessage: string | null
  updatedBy: {
    userId: Types.ObjectId
    name: string
  } | null
  createdAt: Date
  updatedAt: Date
}

const authorSubSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "Usuario", required: true },
    name: { type: String, required: true },
  },
  {
    _id: false,
    versionKey: false,
  }
)

const siteSettingsSchema = new Schema<SiteSettingsDocument>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      default: SITE_SETTINGS_KEY,
    },
    maintenanceMode: { type: Boolean, default: false },
    maintenanceMessage: { type: String, default: null, maxlength: 280 },
    updatedBy: { type: authorSubSchema, default: null },
  },
  { versionKey: false, timestamps: true, collection: "site_settings" }
)

export const SiteSettingsModel: Model<SiteSettingsDocument> =
  (models.SiteSettings as Model<SiteSettingsDocument> | undefined) ??
  model<SiteSettingsDocument>("SiteSettings", siteSettingsSchema)
