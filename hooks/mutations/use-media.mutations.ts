import { mediaKeys } from "@/hooks"
import { mediaService } from "@/services"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useAssignMediaFile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: mediaService.assign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.all() })
      toast.success(`Imagen asignada correctamente`)
    },
    onError: (error) => {
      toast.error(`No se pudo asignar la imagen`, {
        description: error instanceof Error ? error.message : undefined,
      })
    },
  })
}

export function useDeleteMediaFile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: mediaService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.all() })
      toast.success("Archivo eliminado")
    },
    onError: (error) => {
      toast.error("No se pudo eliminar el archivo", {
        description: error instanceof Error ? error.message : undefined,
      })
    },
  })
}

export function useRenameMediaFile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, fileName }: { id: string; fileName: string }) =>
      mediaService.rename(id, fileName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.all() })
      toast.success("Archivo renombrado")
    },
    onError: (error) => {
      toast.error("No se pudo renombrar el archivo", {
        description: error instanceof Error ? error.message : undefined,
      })
    },
  })
}
