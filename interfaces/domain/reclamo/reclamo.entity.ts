export class ReclamoEntity {
  constructor(
    public readonly id: string,

    // Generales
    public readonly fecha: string,
    public readonly hora: string,
    public readonly numeroReclamo: string,

    // 1. Datos del consumidor
    public readonly tipoDocumento: string,
    public readonly numeroDocumento: string,
    public readonly nombres: string,
    public readonly apellidos: string,
    public readonly email: string,
    public readonly celular: string,
    public readonly departamento: string,
    public readonly provincia: string,
    public readonly distrito: string,
    public readonly direccion: string,

    // 2. Bien adquirido
    public readonly tipoBien: string,
    public readonly vin: string,
    public readonly placa: string,
    public readonly sedeCodexHR: string,
    public readonly sedeCompra: string, // nombre de la sede
    public readonly sedeDireccion: string, // dirección de la sede
    public readonly moneda: string,
    public readonly importeBien: number,
    public readonly descripcionBien: string,

    // 3. Detalle del reclamo
    public readonly tipoSolicitud: string,
    public readonly detalleSolicitud: string,
    public readonly pedidoSolicitud: string,
    public readonly isConforme: boolean,

    // Auditoría
    public readonly razonSocial?: string,
    public readonly rucEmpresa?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}
