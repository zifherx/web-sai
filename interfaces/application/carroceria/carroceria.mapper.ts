import { CarroceriaEntity } from "../../domain/carroceria/carroceria.entity"
import { CarroceriaResponseDTO } from "./carroceria.dto"

export class CarroceriaMapper {
  static toDTO(entity: CarroceriaEntity): CarroceriaResponseDTO {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      isActive: entity.isActive,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt?.toISOString(),
      updatedAt: entity.updatedAt?.toISOString(),
    }
  }

  static toDTOList(entities: CarroceriaEntity[]): CarroceriaResponseDTO[] {
    return entities.map(CarroceriaMapper.toDTO)
  }
}
