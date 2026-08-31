import { IUsuario } from "@/modules/auth/application/dto/usuario.dto"
import z from "zod"

export const createUsuarioSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  nombre: z.string().min(2),
  rol: z.enum(["admin", "editor", "sede"]),
  sedeId: z.string().optional(),
})

export type CreateUsuarioInput = z.infer<typeof createUsuarioSchema>

export interface CreateUsuarioOutput {
  usuario: IUsuario
}
