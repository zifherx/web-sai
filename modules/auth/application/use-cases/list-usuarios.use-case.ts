import { type IUsuario } from "@/modules/auth/application/dto/usuario.dto"
import { type IUserRepository } from "@/modules/auth/application/ports/i-user-repository.port"

export class ListUsuariosUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<IUsuario[]> {
    const usuarios = await this.userRepository.findAll()
    return usuarios.map((u) => ({
      id: u.id,
      email: u.email,
      nombre: u.nombre,
      rol: u.rol,
      sedeId: u.sedeId,
    }))
  }
}
