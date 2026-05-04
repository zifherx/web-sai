import { Document, model, models, Schema, Types } from "mongoose"

export interface CotizacionDocument extends Document {
  clienteId: Types.ObjectId
  vehiculoId: Types.ObjectId
  sedeId: Types.ObjectId
  ciudad: string
  intencionCompra: string
  createdAt: Date
  updatedAt: Date
}

const cotizacionSchema = new Schema<CotizacionDocument>(
  {
    clienteId: { type: Schema.Types.ObjectId, ref: "Cliente", required: true },
    vehiculoId: {
      type: Schema.Types.ObjectId,
      ref: "Vehiculo",
      required: true,
    },
    sedeId: { type: Schema.Types.ObjectId, ref: "Sucursal", required: true },
    ciudad: { type: String, required: true },
    intencionCompra: { type: String, required: true },
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

export const CotizacionModel =
  models.Cotizacion || model<CotizacionDocument>("Cotizacion", cotizacionSchema)
