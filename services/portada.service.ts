import { httpClient } from "@/lib/http/axios.client"
import type { APIResponse, PortadaType } from "@/types"

export const portadaService = {
  getAll: async (): Promise<PortadaType[]> => {
    const { data } =
      await httpClient.get<APIResponse<PortadaType[]>>("/portada")
    return data.data
  },
  getActive: async (): Promise<PortadaType[]> => {
    const { data } = await httpClient.get<APIResponse<PortadaType[]>>(
      "/portada?isActive=true"
    )
    return data.data
  },
  getById: async (id: string): Promise<PortadaType> => {
    const { data } = await httpClient.get<APIResponse<PortadaType>>(
      `/portada/${id}`
    )
    return data.data
  },
  create: async (payload: Partial<PortadaType>): Promise<PortadaType> => {
    const { data } = await httpClient.post<APIResponse<PortadaType>>(
      `/portada`,
      payload
    )
    return data.data
  },
  update: async (
    id: string,
    payload: Partial<PortadaType>
  ): Promise<PortadaType> => {
    const { data } = await httpClient.patch<APIResponse<PortadaType>>(
      `/portada/${id}`,
      payload
    )
    return data.data
  },
  remove: async (id: string): Promise<void> => {
    await httpClient.delete(`/portada/${id}`)
  },
}
