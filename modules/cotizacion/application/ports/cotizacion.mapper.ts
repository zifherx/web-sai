import { CotizacionResponseDTO } from "@/modules/cotizacion/application/dto/cotizacion.dto"
import { CotizacionEntity } from "@/modules/cotizacion/domain/entities/Cotizacion"

export class CotizacionMapper {
  static toDTO(entity: CotizacionEntity): CotizacionResponseDTO {
    return {
      id: entity.id,
      clienteId: entity.clienteId,
      vehiculoId: entity.vehiculoId,
      sedeId: entity.sedeId,
      ciudad: entity.ciudad,
      intencionCompra: entity.intencionCompra,
      // UTM — se omiten del DTO si son undefined o string vacío
      utmSource: entity.utmSource || undefined,
      utmMedium: entity.utmMedium || undefined,
      utmCampaign: entity.utmCampaign || undefined,
      utmTerm: entity.utmTerm || undefined,
      urlCampana: entity.urlCampana || undefined,
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
