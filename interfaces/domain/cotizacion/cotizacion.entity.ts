/**
 * Refs populados que llegan en el GET (para mostrar en el admin).
 * En el CREATE solo se guardan los IDs, no los objetos.
 */
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
    public readonly clienteId: string,
    public readonly vehiculoId: string,
    public readonly sedeId: string,
    public readonly ciudad: string,
    public readonly intencionCompra: string,
    // Populated — solo presentes en lecturas, opcionales en creación
    public readonly cliente?: ICotizacionClienteRef,
    public readonly vehiculo?: ICotizacionVehiculoRef,
    public readonly sede?: ICotizacionSedeRef,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}
