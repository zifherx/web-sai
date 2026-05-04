import { Document, model, models, Schema, Types } from "mongoose"

export interface CitaDocument extends Document {
  clienteId: Types.ObjectId
  placa: string
  kilometraje: string
  marcaId: Types.ObjectId
  modeloId: Types.ObjectId | null
  marcaFlat: string
  modeloFlat: string
  sedeId: Types.ObjectId
  ciudadSede: string
  tipoServicio: string
  comentario: string
  whatsappMessage: string
  whatsappContact: string
  createdAt: Date
  updatedAt: Date
}

const citaSchema = new Schema<CitaDocument>(
  {
    clienteId: { type: Schema.Types.ObjectId, ref: "Cliente", required: true },
    placa: { type: String, required: true, uppercase: true },
    kilometraje: { type: String, required: true },
    marcaId: { type: Schema.Types.ObjectId, ref: "Marca", required: true },
    modeloId: { type: Schema.Types.ObjectId, ref: "Vehiculo", default: null },
    marcaFlat: { type: String, required: true },
    modeloFlat: { type: String, default: "" },
    sedeId: { type: Schema.Types.ObjectId, ref: "Sucursal", required: true },
    ciudadSede: { type: String, required: true },
    tipoServicio: { type: String, required: true },
    comentario: { type: String, default: "" },
    whatsappMessage: { type: String, default: "" },
    whatsappContact: { type: String, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "citas",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

citaSchema.index({ clienteId: 1 })
citaSchema.index({ sedeId: 1 })
citaSchema.index({ marcaId: 1 })
citaSchema.index({ tipoServicio: 1 })
citaSchema.index({ createdAt: -1 })

export const CitaModel = models.Cita || model<CitaDocument>("Cita", citaSchema)
