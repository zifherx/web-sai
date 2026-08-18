import {
  LoginInput,
  LoginOutput,
} from "@/modules/auth/application/dto/login.dto"
import { IAuthPort } from "@/modules/auth/application/ports/i-auth.port"
import { IUserRepository } from "@/modules/auth/application/ports/i-user-repository.port"
import { CredencialesInvalidasError } from "@/modules/auth/domain/errors/auth-errors"

export class LoginUseCase {
  constructor(
    private readonly authPort: IAuthPort,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const { usuarioId, token } = await this.authPort.signIn(
      input.email,
      input.password
    )

    const usuario = await this.userRepository.findById(usuarioId)
    if (!usuario) {
      throw new CredencialesInvalidasError()
    }

    return {
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol,
        sedeId: usuario.sedeId,
      },
      token,
    }
  }
}
