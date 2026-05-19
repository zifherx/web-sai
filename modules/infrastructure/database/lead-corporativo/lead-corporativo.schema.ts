import { Document, model, models, Schema, Types } from "mongoose"

export interface LeadCorporativoDocument extends Document {
  nombres: string
  apellidos: string
  dni: string
  correoElectronico: string
  celular: string
  razonSocial: string
  ruc: string
  marcaId: Types.ObjectId | null
  marcaText: string
  ciudad: string
  intencionCompra: string
  sector: string
  fechaCreacion: Date
  createdAt: Date
  updatedAt: Date
}

const leadCorporativoSchema = new Schema<LeadCorporativoDocument>(
  {
    nombres: { type: String, required: true, trim: true },
    apellidos: { type: String, default: "" },
    dni: { type: String, default: "" },
    correoElectronico: { type: String, default: "" },
    celular: { type: String, default: "" },
    razonSocial: { type: String, default: "" },
    ruc: { type: String, default: "" },
    marcaId: { type: Schema.Types.ObjectId, ref: "Marca", default: null },
    marcaText: { type: String, default: "" },
    ciudad: { type: String, default: "" },
    intencionCompra: { type: String, default: "" },
    sector: { type: String, default: "" },
    fechaCreacion: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "leadcorporativos",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

export const LeadCorporativoModel =
  models.LeadCorporativo ||
  model<LeadCorporativoDocument>("LeadCorporativo", leadCorporativoSchema)
