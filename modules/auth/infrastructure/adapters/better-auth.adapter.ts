import { IAuthPort } from "@/modules/auth/application/ports/i-auth.port"
import { Sesion } from "@/modules/auth/domain/entities/sesion.entity"
import { CredencialesInvalidasError } from "@/modules/auth/domain/errors/auth-errors"
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

  async signOut(token: string) {
    await auth.api.signOut({ headers: { authorization: `Bearer ${token}` } })
  }

  async getSesion(token: string) {
    const result = await auth.api.getSession({
      headers: { authorization: `Bearer ${token}` },
    })
    if (!result) return null
    return new Sesion(token, result.user.id, new Date(result.session.expiresAt))
  }
}
