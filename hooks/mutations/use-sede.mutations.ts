import { sedeKeys } from "@/hooks/query-keys"
import { sedeService } from "@/services/sede.service"
import { type SedeType } from "@/types/api.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateSede() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (
      payload: Omit<SedeType, "id" | "createdAt" | "updatedAt" | "createdBy">
    ) => sedeService.create(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: sedeKeys.all() })
    },
  })
}

export function useUpdateSede() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SedeType> }) =>
      sedeService.update(id, data),
    onSuccess: async (updated) => {
      await qc.invalidateQueries({ queryKey: sedeKeys.list() })
      await qc.invalidateQueries({ queryKey: sedeKeys.talleres() })
      // Actualiza el detalle en caché sin esperar el refetch
      qc.setQueryData(sedeKeys.detail(updated.id), updated)
    },
  })
}

export function useDeleteSede() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => sedeService.remove(id),
    onSuccess: async (_, id) => {
      await qc.invalidateQueries({ queryKey: sedeKeys.all() })
      qc.removeQueries({ queryKey: sedeKeys.detail(id) })
    },
  })
}
