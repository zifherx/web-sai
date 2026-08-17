import { Usuario } from "@/modules/auth/domain/entities/usuario.entity"

export interface IUserRepository {
  findById(id: string): Promise<Usuario | null>
  findByEmail(email: string): Promise<Usuario | null>
  existeAlgunUsuario(): Promise<boolean>
  asignarRolAdmin(usuarioId: string): Promise<void>
}
