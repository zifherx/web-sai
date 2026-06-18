interface ParamsBuildWhatsAppMessage {
  nombre: string
  marca: string
  placa: string
  kilometraje: string
  tipoServicio: string
  ciudadSede: string
  comentario: string
}

export interface ICitaClienteRef {
  id: string
  name: string
  tipoDocumento: string
  numeroDocumento: string
  celular: string
  email: string
}

export interface ICitaMarcaRef {
  id: string
  name: string
  slug: string
  imageUrl: string
}

export interface ICitaModeloRef {
  id: string
  name: string
  slug: string
  imageUrl: string
}

export interface ICitaSedeRef {
  id: string
  name: string
  ciudad: string
  codexHR: string
  address: string
  celularCitas: string
}

export class CitaEntity {
  constructor(
    public readonly id: string,

    // Cliente (referencia)
    public readonly clienteId: string,

    // Vehículo
    public readonly placa: string,
    public readonly kilometraje: string,
    public readonly marcaId: string,
    public readonly modeloId: string,
    public readonly marcaFlat: string,
    public readonly modeloFlat: string,

    // Servicio
    public readonly sedeId: string,
    public readonly ciudadSede: string,
    public readonly tipoServicio: string,
    public readonly comentario: string,

    // Notificación WhatsApp — generado por el service
    public readonly whatsappMessage: string,
    public readonly whatsappContact: string,

    // Populated — solo en lecturas
    public readonly cliente?: ICitaClienteRef,
    public readonly marca?: ICitaMarcaRef,
    public readonly modelo?: ICitaModeloRef,
    public readonly concesionario?: ICitaSedeRef,

    // Auditoría
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  static buildWhatsappMessage(params: ParamsBuildWhatsAppMessage): string {
    const lines = [
      `Hola, soy ${params.nombre}.`,
      `Quisiera agendar un servicio de *${params.tipoServicio}*.`,
      `Vehículo: *${params.marca}* | Placa: *${params.placa.toUpperCase()}* | ${params.kilometraje} km`,
      `Ciudad: ${params.ciudadSede}`,
    ]

    if (params.comentario) {
      lines.push(`Comentario: ${params.comentario}`)
    }
    return lines.join("\n")
  }
}
