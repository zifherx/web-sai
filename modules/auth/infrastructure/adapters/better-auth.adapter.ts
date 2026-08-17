import {
  IAuthPort,
  SignUpInput,
} from "@/modules/auth/application/ports/i-auth.port"
import {
  CredencialesInvalidasError,
  UsuarioYaExisteError,
} from "@/modules/auth/domain/errors/auth-errors"
import { auth } from "@/modules/auth/infrastructure/config/better-auth.config"

export class BetterAuthAdapter implements IAuthPort {
  async signIn(email: string, password: string) {
    try {
      const result = await auth.api.signInEmail({ body: { email, password } })
      return { usuarioId: result.user.id, token: result.token }
    } catch (err) {
      throw new CredencialesInvalidasError()
    }
  }

  async signUp({ email, name, password, sedeId }: SignUpInput) {
    try {
      const result = await auth.api.signUpEmail({
        body: { email, password, name, sedeId },
      })
      return {
        usuarioId: result.user.id,
        token: result.token,
      }
    } catch (err) {
      throw new UsuarioYaExisteError(email)
    }
  }

  async signOut(headers: Headers): Promise<void> {
    await auth.api.signOut({ headers })
  }

  async getSesion(headers: Headers) {
    const result = await auth.api.getSession({ headers })
    if (!result) return null
    return {
      usuarioId: result.user.id,
      expiraEn: new Date(result.session.expiresAt),
    }
  }
}
