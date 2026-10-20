import { carroceriaKeys } from "@/hooks/query-keys"
import { carroceriaService } from "@/services/carroceria.service"
import { type CarroceriaType } from "@/types/api.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateCarroceria() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (
      payload: Omit<
        CarroceriaType,
        "id" | "createdAt" | "updatedAt" | "createdBy"
      >
    ) => carroceriaService.create(payload),
    onSuccess: async () => {
      // Invalida raíz → todas las queries del módulo se refetch
      await qc.invalidateQueries({ queryKey: carroceriaKeys.all() })
    },
  })
}

export function useUpdateCarroceria() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CarroceriaType> }) =>
      carroceriaService.update(id, data),
    onSuccess: async (updated) => {
      // Invalida lista + actualiza el detalle en caché sin refetch
      await qc.invalidateQueries({ queryKey: carroceriaKeys.list() })
      qc.setQueryData(carroceriaKeys.detail(updated.id), updated)
    },
  })
}

export function useDeleteCarroceria() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => carroceriaService.remove(id),
    onSuccess: async (_, id) => {
      await qc.invalidateQueries({ queryKey: carroceriaKeys.all() })
      // Elimina el detalle del caché inmediatamente
      qc.removeQueries({ queryKey: carroceriaKeys.detail(id) })
    },
  })
}
