import { Document, model, models, Schema, Types } from "mongoose"

export interface CotizacionDocument extends Document {
  clienteId: Types.ObjectId
  vehiculoId: Types.ObjectId
  sedeId: Types.ObjectId
  ciudad: string
  intencionCompra: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmTerm: string
  urlCampana: string
  createdAt: Date
  updatedAt: Date
}

const cotizacionSchema = new Schema<CotizacionDocument>(
  {
    clienteId: { type: Types.ObjectId, ref: "Cliente", required: true },
    vehiculoId: {
      type: Types.ObjectId,
      ref: "Vehiculo",
      required: true,
    },
    sedeId: { type: Types.ObjectId, ref: "Sucursal", required: true },
    ciudad: { type: String, required: true },
    intencionCompra: { type: String, required: true },
    // Trazabilidad de campañas de marketing digital
    // default "" en lugar de null para facilitar queries de igualdad en el CMS
    utmSource: { type: String, default: "" },
    utmMedium: { type: String, default: "" },
    utmCampaign: { type: String, default: "" },
    utmTerm: { type: String, default: "" },
    urlCampana: { type: String, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "cotizacions", // ← nombre real en MongoDB
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

cotizacionSchema.index({ clienteId: 1 })
cotizacionSchema.index({ vehiculoId: 1 })
cotizacionSchema.index({ sedeId: 1 })
cotizacionSchema.index({ intencionCompra: 1 })
cotizacionSchema.index({ createdAt: -1 })
cotizacionSchema.index({ utmSource: 1 })
cotizacionSchema.index({ utmCampaign: 1 })

export const CotizacionModel =
  models.Cotizacion || model<CotizacionDocument>("Cotizacion", cotizacionSchema)
