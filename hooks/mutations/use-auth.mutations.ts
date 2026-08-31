import { authKeys } from "@/hooks/query-keys"
import { toastError } from "@/lib"
import { useAuthTransition } from "@/providers/Auth-Transition.provider"
import { authService } from "@/services/auth.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

function getErrorMessage(error: unknown): string | undefined {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response
    return response?.data?.message
  }
  return undefined
}

export function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { showTransition, hideTransition } = useAuthTransition()

  return useMutation({
    mutationFn: authService.login,
    onMutate: () => {
      showTransition("Arrancando motor...")
    },
    onSuccess: (usuario) => {
      queryClient.setQueryData(authKeys.session(), usuario)
      router.push("/cms/dashboard")
      setTimeout(hideTransition, 700)
    },
    onError: (error) => {
      hideTransition()
      toastError.generic(getErrorMessage(error) ?? "Credenciales inválidas")
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { showTransition, hideTransition } = useAuthTransition()

  return useMutation({
    mutationFn: authService.logout,
    onMutate: () => {
      showTransition("Cerrando sesión...")
    },
    onSuccess: () => {
      queryClient.setQueryData(authKeys.session(), null)
      queryClient.clear()
      router.push("/login")
      setTimeout(hideTransition, 700)
    },
    onError: () => {
      hideTransition()
    },
  })
}
