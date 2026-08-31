import { portadaKeys } from "@/hooks/query-keys"
import { portadaService } from "@/services/portada.service"
import { PortadaType } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useCreatePortada() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: Partial<PortadaType>) =>
      portadaService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: portadaKeys.all() })
      queryClient.invalidateQueries({ queryKey: portadaKeys.active() })
      toast.success("Portada creada correctamente")
    },
    onError: (error) => {
      toast.error("No se pudo crear la portada", {
        description: error instanceof Error ? error.message : undefined,
      })
    },
  })
}

export function useUpdatePortada() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: Partial<PortadaType>
    }) => portadaService.update(id, payload),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: portadaKeys.all() })
      queryClient.invalidateQueries({ queryKey: portadaKeys.active() })
      queryClient.invalidateQueries({
        queryKey: portadaKeys.detail(updated.id),
      })
      toast.success("Portada actualizada correctamente")
    },
    onError: (error) => {
      toast.error("No se pudo actualizar la portada", {
        description: error instanceof Error ? error.message : undefined,
      })
    },
  })
}

export function useToggleActivePortada() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      portadaService.update(id, { isActive }),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: portadaKeys.all() })
      queryClient.invalidateQueries({ queryKey: portadaKeys.active() })
      queryClient.invalidateQueries({
        queryKey: portadaKeys.detail(updated.id),
      })
      toast.success(
        updated.isActive ? "Portada activada" : "Portada desactivada"
      )
    },
    onError: (error) => {
      toast.error("No se pudo cambiar el estado", {
        description: error instanceof Error ? error.message : undefined,
      })
    },
  })
}

export function useDeletePortada() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => portadaService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: portadaKeys.all() })
      queryClient.invalidateQueries({ queryKey: portadaKeys.active() })
      queryClient.invalidateQueries({ queryKey: portadaKeys.detail(id) })
      toast.success("Portada eliminada permanentemente")
    },
    onError: (error) => {
      toast.error("No se pudo eliminar la portada", {
        description: error instanceof Error ? error.message : undefined,
      })
    },
  })
}
