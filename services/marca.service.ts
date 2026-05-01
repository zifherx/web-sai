import { httpClient } from "../lib/http/axios.client"
import type { APIResponse, MarcaType } from "../types/api.types"

export const marcaService = {
  getAll: async (): Promise<MarcaType[]> => {
    const { data } = await httpClient.get<APIResponse<MarcaType[]>>("/marca")
    return data.data
  },
  getActive: async (): Promise<MarcaType[]> => {
    const { data } = await httpClient.get<APIResponse<MarcaType[]>>(
      "/marca?isActive=true"
    )
    return data.data
  },
  getById: async (id: string): Promise<MarcaType> => {
    const { data } = await httpClient.get<APIResponse<MarcaType>>(
      `/marca/${id}`
    )
    return data.data
  },
  getBySlug: async (slug: string): Promise<MarcaType> => {
    const { data } = await httpClient.get<APIResponse<MarcaType>>(`/marca`, {
      params: { slug },
    })
    return data.data
  },
  create: async (payload: Partial<MarcaType>): Promise<MarcaType> => {
    const { data } = await httpClient.post<APIResponse<MarcaType>>(
      `/marca`,
      payload
    )
    return data.data
  },
  update: async (
    id: string,
    payload: Partial<MarcaType>
  ): Promise<MarcaType> => {
    const { data } = await httpClient.patch<APIResponse<MarcaType>>(
      `/marca/${id}`,
      payload
    )
    return data.data
  },
  remove: async (id: string): Promise<void> => {
    await httpClient.delete(`/marca/${id}`)
  },
}
