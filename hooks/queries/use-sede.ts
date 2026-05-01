import { sedeService } from "@/services/sede.service"
import { ISedeFilters } from "@/types/api.types"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { sedeKeys } from "../query-keys"

export function useSedes(filters?: ISedeFilters) {
  return useQuery({
    queryKey: sedeKeys.list(filters),
    queryFn: () => sedeService.getAll(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  })
}

export function useActiveSedes(filters?: Omit<ISedeFilters, "isActive">) {
  return useQuery({
    queryKey: sedeKeys.active(filters),
    queryFn: () => sedeService.getActive(filters),
    staleTime: 1000 * 60 * 5,
  })
}

export function useSede(id: string) {
  return useQuery({
    queryKey: sedeKeys.detail(id),
    queryFn: () => sedeService.getById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  })
}

export function useSedeBySlug(slug: string) {
  return useQuery({
    queryKey: sedeKeys.slug(slug),
    queryFn: () => sedeService.getBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  })
}

export function useTalleres() {
  return useQuery({
    queryKey: sedeKeys.talleres(),
    queryFn: sedeService.getTallers,
    staleTime: 1000 * 60 * 5,
  })
}

export function useSedeByCiudad(ciudad: string) {
  return useQuery({
    queryKey: sedeKeys.byCiudad(ciudad),
    queryFn: () => sedeService.getByCiudad(ciudad),
    enabled: Boolean(ciudad),
    staleTime: 1000 * 60 * 5,
  })
}
