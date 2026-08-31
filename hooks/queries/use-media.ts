import { mediaKeys } from "@/hooks"
import { mediaService } from "@/services"
import { IMediaFilters } from "@/types"
import { useQuery } from "@tanstack/react-query"

export function useMediaFiles(filters?: IMediaFilters) {
  return useQuery({
    queryKey: mediaKeys.list(filters),
    queryFn: () => mediaService.list(filters),
    staleTime: 1000 * 60,
  })
}

export function useMediaByEntity(entityType: string, entityId: string) {
  return useQuery({
    queryKey: mediaKeys.byEntity(entityType, entityId),
    queryFn: () => mediaService.getByEntity(entityType, entityId),
    enabled: Boolean(entityType && entityId),
  })
}
