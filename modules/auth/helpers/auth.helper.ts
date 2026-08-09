import { auth } from "@/modules/auth/infrastructure/config/better-auth.config"
import { NextRequest } from "next/server"

export async function resolveUserId(req: NextRequest): Promise<string | null> {
  const session = await auth.api.getSession({ headers: req.headers })
  return session?.user.id ?? null
}
