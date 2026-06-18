import { Document, model, models, Schema } from "mongoose"

export interface BitacoraDocument extends Document {
  request: {
    body: string
    authorization: string
    accept: string
  }
  response: {
    body: string
    code: number
    statusText: string
  }
  method: string
  url: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

const requestSchema = new Schema(
  {
    body: { type: String, default: "" },
    authorization: { type: String, default: "" },
    accept: { type: String, default: "" },
  },
  { _id: false }
)

const responseSchema = new Schema(
  {
    body: { type: String, default: "" },
    code: { type: Number, default: 0 },
    statusText: { type: String, default: "" },
  },
  { _id: false }
)

const bitacoraSchema = new Schema<BitacoraDocument>(
  {
    request: { type: requestSchema, required: true },
    response: { type: responseSchema, required: true },
    method: { type: String, default: "POST" },
    url: { type: String, default: "" },
    date: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "bitacoras",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

bitacoraSchema.index({ "response.code": 1 })
bitacoraSchema.index({ createdAt: -1 })

export const BitacoraModel =
  models.Bitacora || model<BitacoraDocument>("Bitacora", bitacoraSchema)
