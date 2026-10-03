"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useMaintenanceMode } from "@/hooks/queries/use-site-settings"
import { MaintenanceForm } from "./Maintenance-Form"

export function MaintenanceToggleCard() {
  const { data, isLoading, isError } = useMaintenanceMode()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-6 w-11 rounded-full" />
        </div>
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="rounded-lg border border-dashed py-10 text-center text-sm text-destructive">
        No se pudo cargar esta configuración o no tienes acceso a ella.
      </div>
    )
  }

  return <MaintenanceForm settings={data} />
}
