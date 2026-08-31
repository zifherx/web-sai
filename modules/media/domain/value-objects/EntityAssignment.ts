import type {
  EntityType,
  FieldName,
} from "@/modules/media/domain/entities/MediaFile"
import { MediaDomainError } from "@/modules/media/domain/errors/media-domain.error"

const DEFAULT_FIELD_BY_ENTITY: Record<EntityType, FieldName> = {
  marca: "imageUrl",
  portada: "imageUrl",
  sede: "imageUrl",
  vehiculo: "imageUrl",
  unassigned: "",
}

const ALLOWEB_FIELDS_BY_ENTITY: Record<EntityType, FieldName[]> = {
  marca: ["imageUrl"],
  portada: ["imageUrl"],
  sede: ["imageUrl"],
  vehiculo: ["imageUrl", "galeria[].imageUrl", "colores[].carColor"],
  unassigned: [""],
}

export class EntityAssignment {
  readonly entityType: EntityType
  readonly entityId: string
  readonly fieldName: FieldName

  private constructor(
    entityType: EntityType,
    entityId: string,
    fieldName: FieldName
  ) {
    this.entityType = entityType
    this.entityId = entityId
    this.fieldName = fieldName
  }

  static create(
    entityType: EntityType,
    entityId: string,
    fieldName?: FieldName
  ): EntityAssignment {
    if (!Object.keys(DEFAULT_FIELD_BY_ENTITY).includes(entityType)) {
      throw new MediaDomainError(`Tipo de entidad "${entityType}" no es válido`)
    }
    if (entityType !== "unassigned" && !entityId?.trim()) {
      throw new MediaDomainError(
        `EntityId es requerido para el tipo de entidad "${entityType}"`
      )
    }

    const resolvedField = fieldName ?? DEFAULT_FIELD_BY_ENTITY[entityType]

    if (!ALLOWEB_FIELDS_BY_ENTITY[entityType].includes(resolvedField)) {
      throw new MediaDomainError(
        `El campo "${resolvedField}" no es válido para el tipo "${entityType}"`
      )
    }

    return new EntityAssignment(
      entityType,
      entityId?.trim() ?? "",
      resolvedField
    )
  }

  static unassigned(): EntityAssignment {
    return new EntityAssignment("unassigned", "", "")
  }

  isAssigned(): boolean {
    return this.entityType !== "unassigned"
  }
}
