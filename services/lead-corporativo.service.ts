import { httpClient } from "@/lib"
import {
  APIResponse,
  LeadCorporativoResponseType,
  LeadCorporativoType,
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
