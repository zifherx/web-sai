import { httpClient } from "@/lib"
import { APIResponse, AuthUsuario, LoginPayload } from "@/types"

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthUsuario> => {
    const { data } = await httpClient.post<
      APIResponse<{
        usuario: AuthUsuario
        token: string | null
      }>
    >("/auth/login", payload)
    return data.data.usuario
  },

  logout: async (): Promise<void> => {
    await httpClient.post("/auth/logout")
  },

  getSession: async (): Promise<AuthUsuario | null> => {
    const { data } = await httpClient.get<{ user: AuthUsuario }>(
      "/auth/get-session"
    )
    return data?.user ?? null
  },
}
