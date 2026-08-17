import { Usuario } from "@/modules/auth/domain/entities/usuario.entity"

export function toUsuarioEntity(doc: any): Usuario {
  return new Usuario(
    doc._id.toString(),
    doc.email,
    doc.name,
    doc.rol ?? "sede",
    doc.sedeId ?? null
  )
}
