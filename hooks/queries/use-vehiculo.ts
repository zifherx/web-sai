import { vehiculoService } from "@/services/vehiculo.service"
import { IVehiculoFilters } from "@/types/api.types"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { vehiculoKeys } from "../query-keys"

export function useVehiculos(filters?: IVehiculoFilters) {
  return useQuery({
    queryKey: vehiculoKeys.list(filters),
    queryFn: () => vehiculoService.getAll(filters),
    placeholderData: keepPreviousData, // evita flash vacío al cambiar filtros
    staleTime: 1000 * 60 * 5,
  })
}

export function useActiveVehiculos(
  filters?: Omit<IVehiculoFilters, "isActive">
) {
  return useQuery({
    queryKey: vehiculoKeys.active(filters),
    queryFn: () => vehiculoService.getActive(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  })
}

export function useVehiculo(id: string) {
  return useQuery({
    queryKey: vehiculoKeys.detail(id),
    queryFn: () => vehiculoService.getById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  })
}

export function useVehiculoBySlug(slug: string) {
  return useQuery({
    queryKey: vehiculoKeys.slug(slug),
    queryFn: () => vehiculoService.getBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  })
}

export function useVehiculosByMarca(marcaId: string) {
  return useQuery({
    queryKey: vehiculoKeys.byMarca(marcaId),
    queryFn: () => vehiculoService.getByMarca(marcaId),
    enabled: Boolean(marcaId),
    staleTime: 1000 * 60 * 5,
  })
}
