import { siteSettingsKeys } from "@/hooks/query-keys"
import { siteSettingsService } from "@/services/site-settings.service"
import { SiteSettingsType } from "@/types/site-settings.types"
import { useQuery } from "@tanstack/react-query"
import { isAxiosError } from "axios"

export function useMaintenanceMode(options?: {
  initialData?: SiteSettingsType
  enabled?: boolean
}) {
  return useQuery({
    queryKey: siteSettingsKeys.maintenance(),
    queryFn: siteSettingsService.getMaintenance,
    staleTime: 1000 * 60,
    initialData: options?.initialData,
    enabled: options?.enabled ?? true,
    retry: (count: any, error: any) =>
      !(
        isAxiosError(error) && [401, 403].includes(error.response?.status ?? 0)
      ) && count < 3,
  })
}
