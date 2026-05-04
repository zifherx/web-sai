import { LeadCorporativoEntity } from "@/interfaces/domain/lead-corporativo/lead-corporativo.entity"
import { LeadCorporativoResponseDTO } from "./lead-corporativo.dto"

export class LeadCorporativoMapper {
  static toDTO(e: LeadCorporativoEntity): LeadCorporativoResponseDTO {
    return {
      id: e.id,
      nombres: e.nombres,
      apellidos: e.apellidos,
      dni: e.dni,
      correoElectronico: e.correoElectronico,
      celular: e.celular,
      razonSocial: e.razonSocial,
      ruc: e.ruc,
      marcaId: e.marcaId,
      marcaText: e.marcaText,
      ciudad: e.ciudad,
      intencionCompra: e.intencionCompra,
      sector: e.sector,
      createdAt: e.createdAt?.toISOString(),
      updatedAt: e.updatedAt?.toISOString(),
    }
  }
  static toDTOList(
    entities: LeadCorporativoEntity[]
  ): LeadCorporativoResponseDTO[] {
    return entities.map(LeadCorporativoMapper.toDTO)
  }
}
