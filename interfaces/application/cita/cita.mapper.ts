import { CitaResponseDTO } from "@/interfaces/application"
import { CitaEntity } from "@/interfaces/domain"

export class CitaMapper {
  static toDTO(entity: CitaEntity): CitaResponseDTO {
    return {
      id: entity.id,
      clienteId: entity.clienteId,
      placa: entity.placa,
      kilometraje: entity.kilometraje,
      marcaId: entity.marcaId,
      modeloId: entity.modeloId,
      marcaFlat: entity.marcaFlat,
      modeloFlat: entity.modeloFlat,
      sedeId: entity.sedeId,
      ciudadSede: entity.ciudadSede,
      tipoServicio: entity.tipoServicio,
      comentario: entity.comentario,
      whatsappMessage: entity.whatsappMessage,
      whatsappContact: entity.whatsappContact,
      cliente: entity.cliente,
      marca: entity.marca,
      modelo: entity.modelo,
      concesionario: entity.concesionario,
      createdAt: entity.createdAt?.toISOString(),
      updatedAt: entity.updatedAt?.toISOString(),
    }
  }

  static toDTOList(entities: CitaEntity[]): CitaResponseDTO[] {
    return entities.map(CitaMapper.toDTO)
  }
}
