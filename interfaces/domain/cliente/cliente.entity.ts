export class ClienteEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly tipoDocumento: string,
    public readonly numeroDocumento: string,
    public readonly celular: string,
    public readonly email: string,
    public readonly usoDatosPersonales: boolean,
    public readonly aceptaPromociones: boolean,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}
