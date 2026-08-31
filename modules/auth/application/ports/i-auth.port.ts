export interface IAuthUser {
  usuarioId: string
}
export interface AuthSuccess extends IAuthUser {
  token: string
}

export interface SignUpResult extends IAuthUser {
  token: string | null
}

export interface AuthSession extends IAuthUser {
  expiraEn: Date
}

export interface SignUpInput {
  email: string
  password: string
  name: string
  sedeId?: string
}

export interface IAuthPort {
  signIn(email: string, password: string): Promise<AuthSuccess>
  signUp(input: SignUpInput): Promise<SignUpResult>
  signOut(headers: Headers): Promise<void>
  getSesion(headers: Headers): Promise<AuthSession | null>
}
