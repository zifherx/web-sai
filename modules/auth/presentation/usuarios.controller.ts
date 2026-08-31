import { ResponseFactory } from "@/lib"
import { createUsuarioSchema } from "@/modules/auth/application/dto/create-usuario.dto"
import { UsuariosAccesoDenegadoError } from "@/modules/auth/domain/errors/auth-errors"
import { authFactory } from "@/modules/auth/factories/auth.factory"
import { usuariosRateLimit } from "@/modules/auth/presentation/usuarios.ratelimit"
import { resolveSesion } from "@/shared/infrastructure/auth/resolve-sesion"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { NextRequest } from "next/server"

async function requireAdmin(req: NextRequest) {
  const sesion = await resolveSesion(req)
  if (!sesion || sesion.rol !== "admin") throw new UsuariosAccesoDenegadoError()
}

export function listUsuariosHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await usuariosRateLimit(req)
    if (!rl.allowed) return rl.response!

    await requireAdmin(req)
    await connectDB()
    const data = await authFactory().listUsuarios.execute()

    return ResponseFactory.success(data, "Usuarios obtenidos")
  })
}

export function createUsuarioHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await usuariosRateLimit(req)
    if (!rl.allowed) return rl.response!

    await requireAdmin(req)
    const body = createUsuarioSchema.parse(await req.json())
    await connectDB()
    const data = await authFactory().createUsuario.execute(body)

    return ResponseFactory.created(data, "Usuario creado")
  })
}
