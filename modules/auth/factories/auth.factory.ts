import { CreateUsuarioUseCase } from "@/modules/auth/application/use-cases/create-usuario.use-case"
import { ListUsuariosUseCase } from "@/modules/auth/application/use-cases/list-usuarios.use-case"
import { LoginUseCase } from "@/modules/auth/application/use-cases/login.use-case"
import { LogoutUseCase } from "@/modules/auth/application/use-cases/logout.use-case"
import { SeedSuperAdminUseCase } from "@/modules/auth/application/use-cases/seed-super-admin.use-case"
import { BetterAuthAdapter } from "@/modules/auth/infrastructure/adapters/better-auth.adapter"
import { MongooseUserRepository } from "@/modules/auth/infrastructure/mongoose/user.mongoose.repository"

export function authFactory() {
  const authPort = new BetterAuthAdapter()
  const userRepository = new MongooseUserRepository()

  return {
    login: new LoginUseCase(authPort, userRepository),
    logout: new LogoutUseCase(authPort),
    seedSuperAdmin: new SeedSuperAdminUseCase(authPort, userRepository),
    createUsuario: new CreateUsuarioUseCase(authPort, userRepository),
    listUsuarios: new ListUsuariosUseCase(userRepository),
  }
}
