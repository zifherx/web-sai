export interface ICotizacionClienteRef {
  id: string
  name: string
  tipoDocumento: string
  numeroDocumento: string
  celular: string
  email: string
}

export interface ICotizacionVehiculoRef {
  id: string
  name: string
  slug: string
  imageUrl: string
  precioBase: number
  marca: string // nombre de la marca (populated)
}

export interface ICotizacionSedeRef {
  id: string
  name: string
  ciudad: string
  codexHR: string
}

export class CotizacionEntity {
  constructor(
    public readonly id: string,

    // IDs de relación
    public readonly clienteId: string,
    public readonly vehiculoId: string,
    public readonly sedeId: string,

    // Datos planos
    public readonly ciudad: string,
    public readonly intencionCompra: string,

    // Trazabilidad de campañas de marketing
    public readonly utmSource?: string,
    public readonly utmMedium?: string,
    public readonly utmCampaign?: string,
    public readonly utmTerm?: string,
    public readonly urlCampana?: string,

    // Populated — solo presentes en lecturas, opcionales en creación
    public readonly cliente?: ICotizacionClienteRef,
    public readonly vehiculo?: ICotizacionVehiculoRef,
    public readonly sede?: ICotizacionSedeRef,

    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}
