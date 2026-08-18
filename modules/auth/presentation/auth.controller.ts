import { ResponseFactory } from "@/lib"
import { loginSchema } from "@/modules/auth/application/dto/login.dto"
import { SeedNoAutorizadoError } from "@/modules/auth/domain/errors/auth-errors"
import { authFactory } from "@/modules/auth/factories/auth.factory"
import { authRateLimit } from "@/modules/auth/presentation/auth.ratelimit"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { type NextRequest } from "next/server"

/**
 * POST /api/cms/auth/login
 *
 * Tier: "public-write" — nunca hay sesión activa antes de loguear.
 * Valida body con `loginSchema` antes de tocar el use-case.
 */
export function loginHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await authRateLimit(req)
    if (!rl.allowed) return rl.response!

    const body = loginSchema.parse(await req.json())
    await connectDB()
    const useCases = authFactory()
    const data = await useCases.login.execute(body)

    return ResponseFactory.success(data, "Sesión iniciada")
  })
}

/**
 * POST /api/cms/auth/logout
 *
 * Tier: "cms-read" si hay sesión, "public" si no — el use-case
 * delega en better-auth, que es idempotente ante headers sin sesión.
 */
export function logoutHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await authRateLimit(req)
    if (!rl.allowed) return rl.response!

    await connectDB()
    const useCases = authFactory()
    await useCases.logout.execute(req.headers)

    return ResponseFactory.success(null, "Sesión cerrada")
  })
}

/**
 * POST /api/auth/seed
 *
 * Bootstrap del primer super admin. Doble guarda:
 *  1) header `x-seed-secret` debe matchear `SEED_SECRET` del ambiente.
 *  2) solo corre si la colección `user` está vacía — una vez ejecutado,
 *     queda inutilizado permanentemente (409) aunque el secret se filtre.
 *
 * Email/password vienen de env vars, NUNCA del body — así nadie puede
 * elegir con qué credenciales se crea el admin, solo disparar la creación
 * de la cuenta que tú ya configuraste por ambiente.
 */
export function seedHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await authRateLimit(req)
    if (!rl.allowed) return rl.response!

    const secret = req.headers.get("x-seed-secret")
    if (!secret || secret !== process.env.SEED_SECRET) {
      throw new SeedNoAutorizadoError()
    }

    await connectDB()
    const data = await authFactory().seedSuperAdmin.execute({
      email: process.env.SEED_SUPERADMIN_EMAIL!,
      password: process.env.SEED_SUPERADMIN_PASSWORD!,
      nombre: process.env.SEED_SUPERADMIN_NAME!,
    })

    return ResponseFactory.created(data, "Super admin creado")
  })
}
