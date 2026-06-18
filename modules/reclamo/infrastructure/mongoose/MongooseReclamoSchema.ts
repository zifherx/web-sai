import { Document, model, models, Schema } from "mongoose"

export interface ReclamoDocument extends Document {
  // Generales
  fecha: string
  hora: string
  numeroReclamo: string
  // 1. Consumidor
  tipoDocumento: string
  numeroDocumento: string
  nombres: string
  apellidos: string
  email: string
  celular: string
  departamento: string
  provincia: string
  distrito: string
  direccion: string
  // 2. Bien
  tipoBien: string
  vin: string
  placa: string
  sedeCodexHR: string
  sedeCompra: string
  sedeDireccion: string
  moneda: string
  importeBien: number
  descripcionBien: string
  // 3. Reclamo
  tipoSolicitud: string
  detalleSolicitud: string
  pedidoSolicitud: string
  isConforme: boolean
  // Auditoría
  razonSocial?: string
  rucEmpresa?: string
  createdAt: Date
  updatedAt: Date
}

const reclamoSchema = new Schema<ReclamoDocument>(
  {
    // Generales
    fecha: { type: String, default: "" },
    hora: { type: String, default: "" },
    numeroReclamo: { type: String, default: "", index: true },

    // 1. Consumidor
    tipoDocumento: { type: String, required: true },
    numeroDocumento: { type: String, required: true },
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    email: { type: String, default: "" },
    celular: { type: String, default: "" },
    departamento: { type: String, default: "" },
    provincia: { type: String, default: "" },
    distrito: { type: String, default: "" },
    direccion: { type: String, default: "" },

    // 2. Bien
    tipoBien: { type: String, required: true },
    vin: { type: String, default: "" },
    placa: { type: String, default: "" },
    sedeCodexHR: { type: String, required: true, uppercase: true },
    sedeCompra: { type: String, default: "" },
    sedeDireccion: { type: String, default: "" },
    moneda: { type: String, default: "pen" },
    importeBien: { type: Number, default: 0 },
    descripcionBien: { type: String, required: true },

    // 3. Reclamo
    tipoSolicitud: { type: String, required: true },
    detalleSolicitud: { type: String, required: true },
    pedidoSolicitud: { type: String, required: true },
    isConforme: { type: Boolean, required: true },

    // Auditoría opcional
    razonSocial: { type: String, default: "" },
    rucEmpresa: { type: String, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "reclamos", // ← colección en MongoDB
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Índices para consultas frecuentes del admin
reclamoSchema.index({ sedeCodexHR: 1 })
reclamoSchema.index({ tipoSolicitud: 1 })
reclamoSchema.index({ createdAt: -1 })

export const ReclamoModel =
  models.Reclamo || model<ReclamoDocument>("Reclamo", reclamoSchema)
