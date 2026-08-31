import { authKeys } from "@/hooks/query-keys"
import { authService } from "@/services/auth.service"
import { useQuery } from "@tanstack/react-query"

export function useSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: authService.getSession,
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}
