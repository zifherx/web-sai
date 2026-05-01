import { httpClient } from "../lib/http/axios.client"
import { APIResponse, IVehiculoFilters, VehiculoType } from "../types/api.types"

export const vehiculoService = {
  getAll: async (filters?: IVehiculoFilters): Promise<VehiculoType[]> => {
    const { data } = await httpClient.get<APIResponse<VehiculoType[]>>(
      "/vehiculo",
      { params: filters }
    )
    return data.data
  },

  getActive: async (
    filters?: Omit<IVehiculoFilters, "isActive">
  ): Promise<VehiculoType[]> => {
    const { data } = await httpClient.get<APIResponse<VehiculoType[]>>(
      "/vehiculo",
      { params: { ...filters, isActive: true } }
    )
    return data.data
  },

  getById: async (id: string): Promise<VehiculoType> => {
    const { data } = await httpClient.get<APIResponse<VehiculoType>>(
      `/vehiculo/${id}`
    )
    return data.data
  },

  getBySlug: async (slug: string): Promise<VehiculoType> => {
    const { data } = await httpClient.get<APIResponse<VehiculoType>>(
      `/vehiculo`,
      { params: { slug } }
    )
    return data.data
  },

  getByMarca: async (marcaId: string): Promise<VehiculoType[]> => {
    const { data } = await httpClient.get<APIResponse<VehiculoType[]>>(
      "/vehiculo",
      { params: { marcaId, isActive: true } }
    )
    return data.data
  },

  create: async (
    payload: Omit<VehiculoType, "id" | "createdAt" | "updatedAt" | "createdBy">
  ): Promise<VehiculoType> => {
    const { data } = await httpClient.post<APIResponse<VehiculoType>>(
      "/vehiculo",
      payload
    )
    return data.data
  },

  update: async (
    id: string,
    payload: Partial<VehiculoType>
  ): Promise<VehiculoType> => {
    const { data } = await httpClient.patch<APIResponse<VehiculoType>>(
      `/vehiculo/${id}`,
      payload
    )
    return data.data
  },

  remove: async (id: string): Promise<void> => {
    await httpClient.delete(`/vehiculo/${id}`)
  },
}
