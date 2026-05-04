// interfaces/application/reclamo/reclamo.mapper.ts
import { ReclamoEntity } from "@/interfaces/domain/reclamo/reclamo.entity"
import { ReclamoResponseDTO } from "./reclamo.dto"

export class ReclamoMapper {
  static toDTO(entity: ReclamoEntity): ReclamoResponseDTO {
    return {
      id: entity.id,
      fecha: entity.fecha,
      hora: entity.hora,
      numeroReclamo: entity.numeroReclamo,
      tipoDocumento: entity.tipoDocumento,
      numeroDocumento: entity.numeroDocumento,
      nombres: entity.nombres,
      apellidos: entity.apellidos,
      email: entity.email,
      celular: entity.celular,
      departamento: entity.departamento,
      provincia: entity.provincia,
      distrito: entity.distrito,
      direccion: entity.direccion,
      tipoBien: entity.tipoBien,
      vin: entity.vin,
      placa: entity.placa,
      sedeCodexHR: entity.sedeCodexHR,
      sedeCompra: entity.sedeCompra,
      sedeDireccion: entity.sedeDireccion,
      moneda: entity.moneda,
      importeBien: entity.importeBien,
      descripcionBien: entity.descripcionBien,
      tipoSolicitud: entity.tipoSolicitud,
      detalleSolicitud: entity.detalleSolicitud,
      pedidoSolicitud: entity.pedidoSolicitud,
      isConforme: entity.isConforme,
      razonSocial: entity.razonSocial,
      rucEmpresa: entity.rucEmpresa,
      createdAt: entity.createdAt?.toISOString(),
      updatedAt: entity.updatedAt?.toISOString(),
    }
  }

  static toDTOList(entities: ReclamoEntity[]): ReclamoResponseDTO[] {
    return entities.map(ReclamoMapper.toDTO)
  }
}
