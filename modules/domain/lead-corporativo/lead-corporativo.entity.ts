export class LeadCorporativoEntity {
  constructor(
    public readonly id: string,
    // Datos de contacto
    public readonly nombres: string,
    public readonly apellidos: string,
    public readonly dni: string,
    public readonly correoElectronico: string,
    public readonly celular: string,
    // Datos de empresa
    public readonly razonSocial: string,
    public readonly ruc: string,
    // Información adicional
    public readonly marcaId: string,
    public readonly marcaText: string,
    public readonly ciudad: string,
    public readonly intencionCompra: string,
    public readonly sector: string,
    public readonly fechaCreacion?: Date,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}
