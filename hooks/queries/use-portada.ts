import { portadaService } from "@/services/portada.service"
import { useQuery } from "@tanstack/react-query"
import { portadaKeys } from "../query-keys"

export function usePortadas() {
  return useQuery({
    queryKey: portadaKeys.all(),
    queryFn: portadaService.getActive,
    staleTime: 1000 * 60 * 5,
  })
}

export function useActivePortadas() {
  return useQuery({
    queryKey: portadaKeys.active(),
    queryFn: portadaService.getActive,
    staleTime: 1000 * 60 * 5,
  })
}

export function usePortada(id: string) {
  return useQuery({
    queryKey: portadaKeys.detail(id),
    queryFn: () => portadaService.getById(id),
    enabled: Boolean(id),
  })
}
