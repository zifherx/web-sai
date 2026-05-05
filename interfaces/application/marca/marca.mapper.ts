import { MarcaResponseDTO } from "@/interfaces/application"
import { MarcaEntity } from "@/interfaces/domain"

export class MarcaMapper {
  static toDTO(entity: MarcaEntity): MarcaResponseDTO {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      idNovaly: entity.idNovaly,
      imageUrl: entity.imageUrl,
      isActive: entity.isActive,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt?.toISOString(),
      updatedAt: entity.updatedAt?.toISOString(),
    }
  }

  static toDTOList(entities: MarcaEntity[]): MarcaResponseDTO[] {
    return entities.map(MarcaMapper.toDTO)
  }
}
