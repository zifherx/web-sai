import { BitacoraResponseItemDTO } from "@/modules/bitacora/application/dto/bitacora.dto"
import { BitacoraEntity } from "@/modules/bitacora/domain/entitites/Bitacora"

export class BitacoraMapper {
  static toDTO(entity: BitacoraEntity): BitacoraResponseItemDTO {
    return {
      id: entity.id,
      request: entity.request,
      response: entity.response,
      method: entity.method,
      url: entity.url,
      // Computed desde la regla de dominio — evita que el frontend
      // tenga que evaluar `response.code >= 200 && code < 300`
      isSuccess: entity.isSuccess(),
      createdAt: entity.createdAt?.toISOString(),
    }
  }

  static toDTOList(entities: BitacoraEntity[]): BitacoraResponseItemDTO[] {
    return entities.map(BitacoraMapper.toDTO)
  }
}
