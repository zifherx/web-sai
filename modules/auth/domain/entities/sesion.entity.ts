export class Sesion {
  constructor(
    public readonly token: string,
    public readonly usuarioId: string,
    public readonly expiraEn: Date
  ) {}

  estaExpirada(): boolean {
    return this.expiraEn.getTime() < Date.now()
  }
}
