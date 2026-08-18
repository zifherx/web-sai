import { auth } from "@/modules/auth/infrastructure/config/better-auth.config"
import { toNextJsHandler } from "better-auth/next-js"

export const { GET, POST } = toNextJsHandler(auth)
