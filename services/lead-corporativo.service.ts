import { httpClient } from "@/lib/http/axios.client"
import {
  type APIResponse,
  type LeadCorporativoResponseType,
  type LeadCorporativoType,
} from "@/types"

export const leadCorporativoService = {
  create: async (
    payload: LeadCorporativoType
  ): Promise<LeadCorporativoResponseType> => {
    const { data } = await httpClient.post<
      APIResponse<LeadCorporativoResponseType>
    >("/lead-corporativo", payload)
    return data.data
  },
}
