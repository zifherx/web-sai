import { usuarioKeys } from "@/hooks/query-keys"
import { usuariosService } from "@/services/usuarios.service"
import { useQuery } from "@tanstack/react-query"

export function useUsuarios() {
  return useQuery({
    queryKey: usuarioKeys.all(),
    queryFn: usuariosService.getAll,
    staleTime: 1000 * 60,
  })
}
