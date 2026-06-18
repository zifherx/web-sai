import {
  SystemEmailByAreaResponseDTO,
  SystemEmailResponseDTO,
} from "@/modules/system-email/application/dto/system-email.dto"
import { SystemEmailEntity } from "@/modules/system-email/domain/entities/System-Email"

export class SystemEmailMapper {
  /** DTO completo para el CMS */
  static toDTO(entity: SystemEmailEntity): SystemEmailResponseDTO {
    return {
      id: entity.id,
      area: entity.area,
      email: entity.email,
      isActive: entity.isActive,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt?.toISOString(),
      updatedAt: entity.updatedAt?.toISOString(),
    }
  }

  static toDTOList(entities: SystemEmailEntity[]): SystemEmailResponseDTO[] {
    return entities.map(SystemEmailMapper.toDTO)
  }

  /**
   * DTO reducido para el endpoint de lookup por área.
   * Solo expone area + email — no revela metadata interna.
   */
  static toAreaDTO(entity: SystemEmailEntity): SystemEmailByAreaResponseDTO {
    return {
      area: entity.area,
      email: entity.email,
    }
  }
}
