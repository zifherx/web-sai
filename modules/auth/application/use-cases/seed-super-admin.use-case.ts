import { IAuthPort } from "@/modules/auth/application/ports/i-auth.port"
import { IUserRepository } from "@/modules/auth/application/ports/i-user-repository.port"
import { SeedYaEjecutadoError } from "@/modules/auth/domain/errors/auth-errors"

interface SeedInput {
  email: string
  password: string
  nombre: string
}

export class SeedSuperAdminUseCase {
  constructor(
    private readonly authPort: IAuthPort,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(input: SeedInput): Promise<{ usuarioId: string }> {
    const yaHayUsuarios = await this.userRepository.existeAlgunUsuario()
    if (yaHayUsuarios) throw new SeedYaEjecutadoError()

    const { usuarioId } = await this.authPort.signUp({
      email: input.email,
      password: input.password,
      name: input.nombre,
    })

    await this.userRepository.actualizarRol(usuarioId, "admin")

    return { usuarioId }
  }
}
