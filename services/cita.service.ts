import { httpClient } from "@/lib"
import { APIResponse, CitaResponseType, CitaType } from "@/types"

export const citaService = {
  create: async (payload: CitaType): Promise<CitaResponseType> => {
    const { data } = await httpClient.post<APIResponse<CitaResponseType>>(
      "/cita",
      payload
    )
    return data.data
  },
}
