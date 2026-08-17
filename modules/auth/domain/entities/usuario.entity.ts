export class Usuario {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly nombre: string,
    public readonly rol: "admin" | "editor" | "sede",
    public readonly sedeId: string | null
  ) {}

  puedeGestionarSede(sedeId: string): boolean {
    if (this.rol === "admin") return true
    return this.sedeId === sedeId
  }
}
