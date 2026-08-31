import { httpClient } from "@/lib"
import { APIResponse, AuthUsuario, CreateUsuarioPayload } from "@/types"

export const usuariosService = {
  getAll: async (): Promise<AuthUsuario[]> => {
    const { data } =
      await httpClient.get<APIResponse<AuthUsuario[]>>("/auth/usuarios")
    return data.data
  },

  create: async (payload: CreateUsuarioPayload): Promise<AuthUsuario> => {
    const { data } = await httpClient.post<
      APIResponse<{ usuario: AuthUsuario }>
    >("/auth/usuarios", payload)
    return data.data.usuario
  },
}
