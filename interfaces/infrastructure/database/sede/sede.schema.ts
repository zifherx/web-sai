import { Document, model, models, Schema, Types } from "mongoose"

export interface SedeDocument extends Document {
  name: string
  slug: string
  idTiendaNovaly: number
  codexHR: string
  imageUrl: string
  ciudad: string
  address: string
  scheduleRegular: string
  scheduleExtended: string
  linkHowArrived: string
  marcasDisponiblesVentas: Types.ObjectId[]
  marcasDisponiblesTaller: Types.ObjectId[]
  coordenadasMapa: {
    latitud: string
    longitud: string
  }
  celularCitas: string
  isTaller: boolean
  isActive: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const sedeSchema = new Schema<SedeDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    idTiendaNovaly: { type: Number, default: 0 },
    codexHR: { type: String, required: true, lowercase: true },
    imageUrl: { type: String, default: "" },
    ciudad: { type: String, default: "" },
    address: { type: String, default: "" },
    scheduleRegular: { type: String, default: "" },
    scheduleExtended: { type: String, default: "" },
    linkHowArrived: { type: String, default: "" },
    marcasDisponiblesVentas: [{ type: Schema.Types.ObjectId, ref: "Marca" }],
    marcasDisponiblesTaller: [{ type: Schema.Types.ObjectId, ref: "Marca" }],
    coordenadasMapa: {
      latitud: { type: String, default: "" },
      longitud: { type: String, default: "" },
    },
    celularCitas: { type: String, default: "" },
    isTaller: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "sucursals",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

sedeSchema.index({ isActive: 1 })
sedeSchema.index({ ciudad: 1 })
sedeSchema.index({ isTaller: 1 })
sedeSchema.index({ marcasDisponiblesVentas: 1 })
sedeSchema.index({ marcasDisponiblesTaller: 1 })

export const SedeModel =
  models.Sucursal || model<SedeDocument>("Sucursal", sedeSchema)
