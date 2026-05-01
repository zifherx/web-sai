import { marcaService } from "@/services/marca.service"
import { useQuery } from "@tanstack/react-query"
import { marcaKeys } from "../query-keys"

export function useMarcas() {
  return useQuery({
    queryKey: marcaKeys.all(),
    queryFn: marcaService.getActive,
    staleTime: 1000 * 60 * 5,
  })
}

export function useActiveMarcas() {
  return useQuery({
    queryKey: marcaKeys.active(),
    queryFn: marcaService.getActive,
    staleTime: 1000 * 60 * 5,
  })
}

export function useMarca(id: string) {
  return useQuery({
    queryKey: marcaKeys.detail(id),
    queryFn: () => marcaService.getById(id),
    enabled: Boolean(id),
  })
}

export function useMarcaBySlug(slug: string) {
  return useQuery({
    queryKey: marcaKeys.slug(slug),
    queryFn: () => marcaService.getBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  })
}
