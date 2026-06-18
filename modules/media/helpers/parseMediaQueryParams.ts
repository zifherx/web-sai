import type { ListMediaFilesDto } from "@/modules/media/application/dtos/media.dto"
import type { EntityType } from "@/modules/media/domain/entities/MediaFile"

const VALID_ENTITY_TYPES: EntityType[] = [
  "marca",
  "portada",
  "sede",
  "vehiculo",
  "galeria",
  "color",
  "unassigned",
]

export function parseMediaQueryParams(
  searchParams: URLSearchParams
): ListMediaFilesDto {
  const entityTypeRaw = searchParams.get("entityType")
  const entityId = searchParams.get("entityId") ?? undefined
  const search = searchParams.get("search") ?? undefined
  const limit = Number(searchParams.get("limit") ?? "50")
  const offset = Number(searchParams.get("offset") ?? "0")

  const entityType =
    entityTypeRaw && VALID_ENTITY_TYPES.includes(entityTypeRaw as EntityType)
      ? (entityTypeRaw as EntityType)
      : undefined

  return {
    entityType,
    entityId,
    search,
    limit: isNaN(limit) ? 50 : limit,
    offset: isNaN(offset) ? 0 : offset,
  }
}
