import { vehiculoService } from "@/services/vehiculo.service"
import { VehiculoType } from "@/types/api.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { vehiculoKeys } from "../query-keys"

export function useCreateVehiculo() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (
      payload: Omit<
        VehiculoType,
        "id" | "createdAt" | "updatedAt" | "createdBy"
      >
    ) => vehiculoService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: vehiculoKeys.all() })
    },
  })
}

export function useUpdateVehiculo() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<VehiculoType> }) =>
      vehiculoService.update(id, data),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: vehiculoKeys.list() })
      // Invalida también el byMarca del vehículo actualizado
      qc.invalidateQueries({ queryKey: vehiculoKeys.byMarca(updated.marcaId) })
      qc.setQueryData(vehiculoKeys.detail(updated.id), updated)
    },
  })
}

export function useDeleteVehiculo() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => vehiculoService.remove(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: vehiculoKeys.all() })
      qc.removeQueries({ queryKey: vehiculoKeys.detail(id) })
    },
  })
}
