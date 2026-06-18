import { Document, model, models, Schema, Types } from "mongoose"

export interface VehiculoDocument extends Document {
  name: string
  slug: string
  codigo_flashdealer: string
  imageUrl: string
  precioBase: number
  fichaTecnica: string
  marca: Types.ObjectId
  carroceria: Types.ObjectId
  isEntrega48H: boolean
  isGLP: boolean
  isLiquidacion: boolean
  isNuevo: boolean
  isActive: boolean
  colores: {
    label: string
    hex: string
    carColor: string
    isActive: boolean
  }[]
  features: {
    feature1: { superTitle: string; mainTitle: string; subTitle: string }[]
    feature2: { superTitle: string; mainTitle: string; subTitle: string }[]
  }
  galeria: { name: string; imageUrl: string }[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const colorSubSchema = new Schema(
  {
    label: { type: String },
    hex: { type: String },
    carColor: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { _id: false } // no genera _id en subdocumentos
)

const featureSubSchema = new Schema(
  {
    superTitle: { type: String },
    mainTitle: { type: String },
    subTitle: { type: String },
  },
  { _id: false }
)

const galeriaSubSchema = new Schema(
  {
    name: { type: String },
    imageUrl: { type: String },
  },
  { _id: false }
)

const vehiculoSchema = new Schema<VehiculoDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    codigo_flashdealer: { type: String, default: "" },
    imageUrl: { type: String },
    precioBase: { type: Number },
    fichaTecnica: { type: String },
    marca: { type: Schema.Types.ObjectId, ref: "Marca" },
    carroceria: { type: Schema.Types.ObjectId, ref: "Carroceria" },
    isEntrega48H: { type: Boolean, default: false },
    isGLP: { type: Boolean, default: false },
    isLiquidacion: { type: Boolean, default: false },
    isNuevo: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    colores: { type: [colorSubSchema], default: [] },
    features: {
      feature1: { type: [featureSubSchema], default: [] },
      feature2: { type: [featureSubSchema], default: [] },
    },
    galeria: { type: [galeriaSubSchema], default: [] },
    createdBy: { type: String, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "modelos",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

vehiculoSchema.index({ isActive: 1 })
vehiculoSchema.index({ marca: 1 })
vehiculoSchema.index({ carroceria: 1 })
vehiculoSchema.index({ isNuevo: 1 })
vehiculoSchema.index({ isLiquidacion: 1 })
vehiculoSchema.index({ precioBase: 1 })

export const VehiculoModel =
  models.Vehiculo || model<VehiculoDocument>("Vehiculo", vehiculoSchema)
