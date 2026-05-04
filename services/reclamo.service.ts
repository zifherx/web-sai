import { httpClient } from "@/lib"
import type {
  APIResponse,
  ISendEmailPayload,
  ReclamoResponseType,
  ReclamoType,
} from "@/types"

export const reclamoService = {
  create: async (payload: ReclamoType): Promise<ReclamoResponseType> => {
    const { data } = await httpClient.post<APIResponse<ReclamoResponseType>>(
      "/reclamo",
      payload
    )
    return data.data
  },

  sendEmail: async (params: ISendEmailPayload): Promise<void> => {
    await httpClient.post("/send-email/reclamo", params)
  },
}
