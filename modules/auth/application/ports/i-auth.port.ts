import { Sesion } from "@/modules/auth/domain/entities/sesion.entity"

export interface AuthSuccess {
  usuarioId: string
  token: string
}

export interface IAuthPort {
  signIn(email: string, password: string): Promise<AuthSuccess>
  signOut(token: string): Promise<void>
  getSesion(token: string): Promise<Sesion | null>
}
