import { Usuario } from "@/modules/auth/domain/entities/usuario.entity"

export type IRol = "admin" | "editor" | "sede"
export interface IUserRepository {
  findById(id: string): Promise<Usuario | null>
  findByEmail(email: string): Promise<Usuario | null>
  findAll(): Promise<Usuario[]>
  existeAlgunUsuario(): Promise<boolean>
  actualizarRol(usuarioId: string, rol: IRol): Promise<void>
}
