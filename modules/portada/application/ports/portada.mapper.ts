import { PortadaResponseDTO } from "@/modules/portada/application/dtos/portada.dto"
import { PortadaEntity } from "@/modules/portada/domain/entities/Portada"

export class PortadaMapper {
  static toDTO(entity: PortadaEntity): PortadaResponseDTO {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      imageUrl: entity.imageUrl,
      isActive: entity.isActive,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt?.toISOString(),
      updatedAt: entity.updatedAt?.toISOString(),
    }
  }

  static toDTOList(entities: PortadaEntity[]): PortadaResponseDTO[] {
    return entities.map(PortadaMapper.toDTO)
  }
}
