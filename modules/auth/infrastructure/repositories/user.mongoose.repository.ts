// modules/auth/infrastructure/repositories/user.mongoose.repository.ts
import { IUserRepository } from "@/modules/auth/application/ports/i-user-repository.port"
import { Usuario } from "@/modules/auth/domain/entities/usuario.entity"
import { UserModel } from "./user.schema" // tu colección "user" que crea better-auth
import { toUsuarioEntity } from "../mappers/user.mapper"

export class UserMongooseRepository implements IUserRepository {
  async findById(id: string): Promise<Usuario | null> {
    const doc = await UserModel.findById(id).lean()
    return doc ? toUsuarioEntity(doc) : null
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const doc = await UserModel.findOne({ email }).lean()
    return doc ? toUsuarioEntity(doc) : null
  }
}
