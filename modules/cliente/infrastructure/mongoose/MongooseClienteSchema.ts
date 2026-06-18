import { Document, model, models, Schema } from "mongoose"

export interface ClienteDocument extends Document {
  name: string
  tipoDocumento: string
  numeroDocumento: string
  celular: string
  email: string
  usoDatosPersonales: boolean
  aceptaPromociones: boolean
  createdAt: Date
  updatedAt: Date
}

const clienteSchema = new Schema<ClienteDocument>(
  {
    name: { type: String, required: true, trim: true },
    tipoDocumento: { type: String, required: true },
    numeroDocumento: { type: String, required: true, unique: true, trim: true },
    celular: { type: String, default: "" },
    email: { type: String, default: "", lowercase: true, trim: true },
    usoDatosPersonales: { type: Boolean, default: false },
    aceptaPromociones: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "clientes",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

clienteSchema.index({ email: 1 })

export const ClienteModel =
  models.Cliente || model<ClienteDocument>("Cliente", clienteSchema)
