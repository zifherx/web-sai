import { httpClient } from "@/lib/http/axios.client"
import type { APIResponse, ISedeFilters, SedeType } from "@/types"

export const sedeService = {
  getAll: async (filters?: ISedeFilters): Promise<SedeType[]> => {
    const { data } = await httpClient.get<APIResponse<SedeType[]>>("/sede", {
      params: filters,
    })
    return data.data
  },
  getActive: async (
    filters?: Omit<ISedeFilters, "isActive">
  ): Promise<SedeType[]> => {
    const { data } = await httpClient.get<APIResponse<SedeType[]>>("/sede", {
      params: { ...filters, isActive: true },
    })
    return data.data
  },
  getById: async (id: string): Promise<SedeType> => {
    const { data } = await httpClient.get<APIResponse<SedeType>>(`/sede/${id}`)
    return data.data
  },
  getBySlug: async (slug: string): Promise<SedeType> => {
    const { data } = await httpClient.get<APIResponse<SedeType>>(`/sede`, {
      params: { slug },
    })
    return data.data
  },
  getTallers: async (): Promise<SedeType[]> => {
    const { data } = await httpClient.get<APIResponse<SedeType[]>>(`/sede`, {
      params: { isTaller: true, isActive: true },
    })
    return data.data
  },
  getByMarcaNombre: async (marcaNombre: string): Promise<SedeType[]> => {
    const { data } = await httpClient.get<APIResponse<SedeType[]>>(
      `/sede?marcaNombre=${encodeURIComponent(marcaNombre)}`
    )
    return data.data
  },
  getByCiudad: async (ciudad: string): Promise<SedeType[]> => {
    const { data } = await httpClient.get<APIResponse<SedeType[]>>("/sede", {
      params: { ciudad, isActive: true },
    })
    return data.data
  },
  create: async (
    payload: Omit<SedeType, "id" | "createdAt" | "updatedAt" | "createdBy">
  ): Promise<SedeType> => {
    const { data } = await httpClient.post<APIResponse<SedeType>>(
      `/sede`,
      payload
    )
    return data.data
  },
  update: async (id: string, payload: Partial<SedeType>): Promise<SedeType> => {
    const { data } = await httpClient.patch<APIResponse<SedeType>>(
      `/sede/${id}`,
      payload
    )
    return data.data
  },
  remove: async (id: string): Promise<void> => {
    await httpClient.delete(`/sede/${id}`)
  },
}
