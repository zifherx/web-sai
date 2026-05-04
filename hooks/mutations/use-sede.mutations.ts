import { sedeService } from "@/services/sede.service"
import { SedeType } from "@/types/api.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sedeKeys } from "../query-keys"

export function useCreateSede() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (
      payload: Omit<SedeType, "id" | "createdAt" | "updatedAt" | "createdBy">
    ) => sedeService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: sedeKeys.all() })
    },
  })
}

export function useUpdateSede() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SedeType> }) =>
      sedeService.update(id, data),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: sedeKeys.list() })
      qc.invalidateQueries({ queryKey: sedeKeys.talleres() })
      // Actualiza el detalle en caché sin esperar el refetch
      qc.setQueryData(sedeKeys.detail(updated.id), updated)
    },
  })
}

export function useDeleteSede() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => sedeService.remove(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: sedeKeys.all() })
      qc.removeQueries({ queryKey: sedeKeys.detail(id) })
    },
  })
}
