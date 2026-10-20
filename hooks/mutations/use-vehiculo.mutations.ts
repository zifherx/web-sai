import { vehiculoKeys } from "@/hooks/query-keys"
import { vehiculoService } from "@/services/vehiculo.service"
import { type VehiculoType } from "@/types/api.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateVehiculo() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (
      payload: Omit<
        VehiculoType,
        "id" | "createdAt" | "updatedAt" | "createdBy"
      >
    ) => vehiculoService.create(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: vehiculoKeys.all() })
    },
  })
}

export function useUpdateVehiculo() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<VehiculoType> }) =>
      vehiculoService.update(id, data),
    onSuccess: async (updated) => {
      await qc.invalidateQueries({ queryKey: vehiculoKeys.list() })
      // Invalida también el byMarca del vehículo actualizado
      await qc.invalidateQueries({
        queryKey: vehiculoKeys.byMarca(updated.marcaId),
      })
      qc.setQueryData(vehiculoKeys.detail(updated.id), updated)
    },
  })
}

export function useDeleteVehiculo() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => vehiculoService.remove(id),
    onSuccess: async (_, id) => {
      await qc.invalidateQueries({ queryKey: vehiculoKeys.all() })
      qc.removeQueries({ queryKey: vehiculoKeys.detail(id) })
    },
  })
}
