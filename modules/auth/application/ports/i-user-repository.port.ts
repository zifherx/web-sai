import { Usuario } from "@/modules/auth/domain/entities/usuario.entity"

export interface IUsuario {
  id: string
  email: string
  nombre: string
  rol: string
}

export interface IUserRepository {
  findById(id: string): Promise<Usuario | null>
  findByEmail(email: string): Promise<Usuario | null>
}
