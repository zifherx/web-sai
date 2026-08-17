import { IUserRepository } from "@/modules/auth/application/ports/i-user-repository.port"
import { Usuario } from "@/modules/auth/domain/entities/usuario.entity"
import { toUsuarioEntity } from "@/modules/auth/infrastructure/mongoose/user.mapper"
import { UserModel } from "@/modules/auth/infrastructure/mongoose/user.mongoose.schema"

export class MongooseUserRepository implements IUserRepository {
  async findById(id: string): Promise<Usuario | null> {
    const doc = await UserModel.findById(id).lean()
    return doc ? toUsuarioEntity(doc) : null
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const doc = await UserModel.findOne({ email }).lean()
    return doc ? toUsuarioEntity(doc) : null
  }

  async existeAlgunUsuario(): Promise<boolean> {
    const existe = await UserModel.exists({})
    return existe !== null
  }

  async asignarRolAdmin(usuarioId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(
      usuarioId,
      {
        rol: "admin",
      },
      {
        returnDocument: "after",
      }
    )
  }
}
