export type EntityType =
  "marca" | "portada" | "sede" | "vehiculo" | "unassigned"

export type FieldName =
  "imageUrl" | "galeria[].imageUrl" | "colores[].carColor" | ""

export interface MediaFileProps {
  id: string
  fileKey: string
  fileUrl: string
  fileName: string
  fileSize: number
  fileType: string
  entityType: EntityType
  entityId: string
  fieldName: FieldName
  uploadedBy: string
  createdAt: Date
  updatedAt: Date
}

export class MediaFile {
  readonly id: string
  readonly fileKey: string
  readonly fileUrl: string
  readonly fileName: string
  readonly fileSize: number
  readonly fileType: string
  readonly entityType: EntityType
  readonly entityId: string
  readonly fieldName: FieldName
  readonly uploadedBy: string
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor(props: MediaFileProps) {
    this.id = props.id
    this.fileKey = props.fileKey
    this.fileUrl = props.fileUrl
    this.fileName = props.fileName
    this.fileSize = props.fileSize
    this.fileType = props.fileType
    this.entityType = props.entityType
    this.entityId = props.entityId
    this.fieldName = props.fieldName
    this.uploadedBy = props.uploadedBy
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  isAssigned(): boolean {
    return this.entityType !== "unassigned" && this.entityId !== ""
  }

  belongsTo(entityType: EntityType, entityId: string): boolean {
    return this.entityType === entityType && this.entityId === entityId
  }

  assign(
    entityType: EntityType,
    entityId: string,
    fieldName: FieldName
  ): MediaFile {
    return new MediaFile({
      ...this.toProps(),
      entityType,
      entityId,
      fieldName,
      updatedAt: new Date(),
    })
  }

  rename(newFileName: string): MediaFile {
    return new MediaFile({
      ...this.toProps(),
      fileName: newFileName,
      updatedAt: new Date(),
    })
  }

  toProps(): MediaFileProps {
    return {
      id: this.id,
      fileKey: this.fileKey,
      fileUrl: this.fileUrl,
      fileName: this.fileName,
      fileSize: this.fileSize,
      fileType: this.fileType,
      entityType: this.entityType,
      entityId: this.entityId,
      fieldName: this.fieldName,
      uploadedBy: this.uploadedBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
