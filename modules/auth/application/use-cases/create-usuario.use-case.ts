import {
  CreateUsuarioInput,
  CreateUsuarioOutput,
} from "@/modules/auth/application/dto/create-usuario.dto"
import { IAuthPort } from "@/modules/auth/application/ports/i-auth.port"
import { IUserRepository } from "@/modules/auth/application/ports/i-user-repository.port"
import {
  UsuarioNoEncontradoError,
  UsuarioYaExisteError,
} from "@/modules/auth/domain/errors/auth-errors"

export class CreateUsuarioUseCase {
  constructor(
    private readonly authPort: IAuthPort,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(input: CreateUsuarioInput): Promise<CreateUsuarioOutput> {
    const existente = await this.userRepository.findByEmail(input.email)
    if (existente) throw new UsuarioYaExisteError(input.email)

    const { usuarioId } = await this.authPort.signUp({
      email: input.email,
      password: input.password,
      name: input.nombre,
      sedeId: input.sedeId,
    })

    await this.userRepository.actualizarRol(usuarioId, input.rol)

    const usuario = await this.userRepository.findById(usuarioId)
    if (!usuario) throw new UsuarioNoEncontradoError(usuarioId)

    return {
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol,
        sedeId: usuario.sedeId,
      },
    }
  }
}
