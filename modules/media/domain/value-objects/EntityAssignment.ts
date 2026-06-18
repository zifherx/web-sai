import type {
  EntityType,
  FieldName,
} from "@/modules/media/domain/entities/MediaFile"
import { MediaDomainError } from "@/modules/media/domain/errors/MediaDomainError"

const ENTITY_FIELD_MAP: Record<EntityType, FieldName> = {
  marca: "imageUrl",
  portada: "imageUrl",
  sede: "imageUrl",
  vehiculo: "imageUrl",
  galeria: "galeria[].imageUrl",
  color: "colores[].carColor",
  unassigned: "",
}

export class EntityAssignment {
  readonly entityType: EntityType
  readonly entityId: string
  readonly fieldName: FieldName

  private constructor(entityType: EntityType, entityId: string) {
    this.entityType = entityType
    this.entityId = entityId
    this.fieldName = ENTITY_FIELD_MAP[entityType]
  }

  static create(entityType: EntityType, entityId: string): EntityAssignment {
    if (entityType !== "unassigned" && !entityId?.trim()) {
      throw new MediaDomainError(
        `EntityId es requerido para el tipo de entidad "${entityType}"`
      )
    }
    if (!Object.keys(ENTITY_FIELD_MAP).includes(entityType)) {
      throw new MediaDomainError(`Tipo de entidad "${entityType}" no es válido`)
    }
    return new EntityAssignment(entityType, entityId?.trim() ?? "")
  }

  static unassigned(): EntityAssignment {
    return new EntityAssignment("unassigned", "")
  }

  isAssigned(): boolean {
    return this.entityType !== "unassigned"
  }

  /** Retorna el campo destino del schema Mongoose correspondiente */
  static resolveFieldName(entityType: EntityType): FieldName {
    return ENTITY_FIELD_MAP[entityType] ?? ""
  }
}
