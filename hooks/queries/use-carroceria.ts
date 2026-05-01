import { carroceriaService } from "@/services/carroceria.service"
import { ICarroceriaFilters } from "@/types/api.types"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { carroceriaKeys } from "../query-keys"

export function useCarrocerias(filters?: ICarroceriaFilters) {
  return useQuery({
    queryKey: carroceriaKeys.list(filters),
    queryFn: () => carroceriaService.getAll(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
  })
}

export function useActiveCarrocerias() {
  return useQuery({
    queryKey: carroceriaKeys.active(),
    queryFn: carroceriaService.getActive,
    staleTime: 1000 * 60 * 10,
  })
}

export function useCarroceria(id: string) {
  return useQuery({
    queryKey: carroceriaKeys.detail(id),
    queryFn: () => carroceriaService.getById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 10,
  })
}

export function useCarroceriaBySlug(slug: string) {
  return useQuery({
    queryKey: carroceriaKeys.slug(slug),
    queryFn: () => carroceriaService.getBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 10,
  })
}
