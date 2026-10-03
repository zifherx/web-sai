import { httpClient } from "@/lib/http/axios.client"
import { APIResponse } from "@/types/api.types"
import {
  SetMaintenancePayload,
  SiteSettingsType,
} from "@/types/site-settings.types"

export const siteSettingsService = {
  getMaintenance: async (): Promise<SiteSettingsType> => {
    const { data } = await httpClient.get<APIResponse<SiteSettingsType>>(
      "/site-settings/maintenance"
    )
    return data.data
  },
  setMaintenance: async (
    payload: SetMaintenancePayload
  ): Promise<SiteSettingsType> => {
    const { data } = await httpClient.patch<APIResponse<SiteSettingsType>>(
      "/site-settings/maintenance",
      payload
    )
    return data.data
  },
}
