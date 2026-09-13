import {
  createUsuarioHandler,
  listUsuariosHandler,
} from "@/modules/auth/presentation/usuarios.controller"
import { NextRequest } from "next/server"

export const GET = (req: NextRequest) => listUsuariosHandler(req)
export const POST = (req: NextRequest) => createUsuarioHandler(req)
