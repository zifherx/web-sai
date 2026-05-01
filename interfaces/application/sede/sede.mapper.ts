import { SedeEntity } from "@/interfaces/domain/sede/sede.entity"
import { SedeResponseDTO } from "./sede.dto"

export class SedeMapper {
  static toDTO(entity: SedeEntity): SedeResponseDTO {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      idTiendaNovaly: entity.idTiendaNovaly,
      codexHR: entity.codexHR,
      imageUrl: entity.imageUrl,
      ciudad: entity.ciudad,
      address: entity.address,
      scheduleRegular: entity.scheduleRegular,
      scheduleExtended: entity.scheduleExtended,
      linkHowArrived: entity.linkHowArrived,
      marcasDisponiblesVentas: entity.marcasDisponiblesVentas,
      marcasDisponiblesTaller: entity.marcasDisponiblesTaller,
      coordenadasMapa: entity.coordenadasMapa,
      celularCitas: entity.celularCitas,
      isTaller: entity.isTaller,
      isActive: entity.isActive,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt?.toISOString(),
      updatedAt: entity.updatedAt?.toISOString(),
    }
  }

  static toDTOList(entities: SedeEntity[]): SedeResponseDTO[] {
    return entities.map(SedeMapper.toDTO)
  }
}
