import { httpClient } from "@/lib/http/axios.client"
import type { APIResponse, CarroceriaType, ICarroceriaFilters } from "@/types"

export const carroceriaService = {
  getAll: async (filters?: ICarroceriaFilters): Promise<CarroceriaType[]> => {
    const { data } = await httpClient.get<APIResponse<CarroceriaType[]>>(
      "/carroceria",
      { params: filters }
    )
    return data.data
  },
  getActive: async (): Promise<CarroceriaType[]> => {
    const { data } = await httpClient.get<APIResponse<CarroceriaType[]>>(
      "/carroceria",
      { params: { isActive: true } }
    )
    return data.data
  },
  getById: async (id: string): Promise<CarroceriaType> => {
    const { data } = await httpClient.get<APIResponse<CarroceriaType>>(
      `/carroceria/${id}`
    )
    return data.data
  },
  getBySlug: async (slug: string): Promise<CarroceriaType> => {
    const { data } = await httpClient.get<APIResponse<CarroceriaType>>(
      `/carroceria`,
      { params: { slug } }
    )
    return data.data
  },
  create: async (
    payload: Omit<
      CarroceriaType,
      "id" | "createdAt" | "updatedAt" | "createdBy"
    >
  ): Promise<CarroceriaType> => {
    const { data } = await httpClient.post<APIResponse<CarroceriaType>>(
      `/carroceria`,
      payload
    )
    return data.data
  },
  update: async (
    id: string,
    payload: Partial<CarroceriaType>
  ): Promise<CarroceriaType> => {
    const { data } = await httpClient.patch<APIResponse<CarroceriaType>>(
      `/carroceria/${id}`,
      payload
    )
    return data.data
  },
  remove: async (id: string): Promise<void> => {
    await httpClient.delete(`/carroceria/${id}`)
  },
}
