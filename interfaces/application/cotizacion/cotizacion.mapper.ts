import { CotizacionResponseDTO } from "@/interfaces/application"
import { CotizacionEntity } from "@/interfaces/domain"

export class CotizacionMapper {
  static toDTO(entity: CotizacionEntity): CotizacionResponseDTO {
    return {
      id: entity.id,
      clienteId: entity.clienteId,
      vehiculoId: entity.vehiculoId,
      sedeId: entity.sedeId,
      ciudad: entity.ciudad,
      intencionCompra: entity.intencionCompra,
      cliente: entity.cliente,
      vehiculo: entity.vehiculo,
      sede: entity.sede,
      createdAt: entity.createdAt?.toISOString(),
      updatedAt: entity.updatedAt?.toISOString(),
    }
  }

  static toDTOList(entities: CotizacionEntity[]): CotizacionResponseDTO[] {
    return entities.map(CotizacionMapper.toDTO)
  }
}
