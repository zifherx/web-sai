import { portadaKeys } from "@/hooks/query-keys"
import { portadaService } from "@/services/portada.service"
import { PortadaType } from "@/types"
import { useQuery } from "@tanstack/react-query"

export function usePortadas() {
  return useQuery({
    queryKey: portadaKeys.all(),
    queryFn: portadaService.getAll,
    staleTime: 1000 * 60 * 5,
  })
}

export function useActivePortadas(options?: { initialData: PortadaType[] }) {
  return useQuery({
    queryKey: portadaKeys.active(),
    queryFn: portadaService.getActive,
    staleTime: 1000 * 60 * 5,
    initialData: options?.initialData,
  })
}

export function usePortada(id: string) {
  return useQuery({
    queryKey: portadaKeys.detail(id),
    queryFn: () => portadaService.getById(id),
    enabled: Boolean(id),
  })
}
