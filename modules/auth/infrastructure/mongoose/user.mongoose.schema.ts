import { Document, model, models, Schema } from "mongoose"

export interface UserDocument extends Document {
  name: string
  email: string
  emailVerified: boolean
  rol: string
  sedeId: string
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    rol: { type: String, enum: ["admin", "editor", "sede"], default: "sede" },
    sedeId: { type: String, default: null },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "user",
    timestamps: true,
  }
)

export const UserModel =
  models.Usuario ?? model<UserDocument>("Usuario", UserSchema)
