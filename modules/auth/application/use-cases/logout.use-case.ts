import { IAuthPort } from "@/modules/auth/application/ports/i-auth.port"

export class LogoutUseCase {
  constructor(private readonly authPort: IAuthPort) {}

  async execute(headers: Headers): Promise<void> {
    await this.authPort.signOut(headers)
  }
}
