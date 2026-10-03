import { siteSettingsKeys } from "@/hooks/query-keys"
import { toastError, toastSuccess } from "@/lib/toast-helpers"
import { siteSettingsService } from "@/services/site-settings.service"
import { SetMaintenancePayload } from "@/types/site-settings.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useSetMaintenanceMode() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SetMaintenancePayload) =>
      siteSettingsService.setMaintenance(payload),
    onSuccess: (updated) => {
      // Documento único: se reemplaza la caché sin refetch
      queryClient.setQueryData(siteSettingsKeys.maintenance(), updated)
      toastSuccess.settings(
        updated.maintenanceMode
          ? "Modo mantenimiento activado en el sitio público"
          : "Sitio público restablecido"
      )
    },
    onError: (error) => {
      toastError.settings(error instanceof Error ? error.message : undefined)
    },
  })
}
