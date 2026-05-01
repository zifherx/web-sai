import { VehiculoEntity } from "@/interfaces/domain/vehiculo/vehiculo.entity"
import { VehiculoResponseDTO } from "./vehiculo.dto"

export class VehiculoMapper {
  static toDTO(entity: VehiculoEntity): VehiculoResponseDTO {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      codigoFlashdealer: entity.codigoFlashdealer,
      imageUrl: entity.imageUrl,
      precioBase: entity.precioBase,
      fichaTecnica: entity.fichaTecnica,
      marcaId: entity.marcaId,
      carroceriaId: entity.carroceriaId,
      isEntrega48H: entity.isEntrega48H,
      isGLP: entity.isGLP,
      isLiquidacion: entity.isLiquidacion,
      isNuevo: entity.isNuevo,
      isActive: entity.isActive,
      colores: entity.colores,
      features: entity.features,
      galeria: entity.galeria,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt?.toISOString(),
      updatedAt: entity.updatedAt?.toISOString(),
    }
  }

  static toDTOList(entities: VehiculoEntity[]): VehiculoResponseDTO[] {
    return entities.map(VehiculoMapper.toDTO)
  }
}
