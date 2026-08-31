import { usuarioKeys } from "@/hooks/query-keys"
import { toastError, toastSuccess } from "@/lib"
import { usuariosService } from "@/services/usuarios.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function getErrorMessage(error: unknown): string | undefined {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response
    return response?.data?.message
  }
  return undefined
}

export function useCreateUsuario() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: usuariosService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usuarioKeys.all() })
      toastSuccess.usuario()
    },
    onError: (error) => {
      toastError.generic(getErrorMessage(error) ?? "No se pudo crear el usuaio")
    },
  })
}
