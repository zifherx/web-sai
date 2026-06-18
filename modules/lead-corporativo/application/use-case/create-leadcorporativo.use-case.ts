import {
  CreateLeadCorporativoDTO,
  LeadCorporativoResponseDTO,
} from "@/modules/lead-corporativo/application/dto/lead-corporativo.dto"
import { LeadCorporativoMapper } from "@/modules/lead-corporativo/application/mapper/lead-corporativo.mapper"
import { ILeadCorporativoRepository } from "@/modules/lead-corporativo/domain/repositories/ILeadCorporativoRepository"

/**
 * Caso de uso: Registrar un nuevo lead corporativo.
 *
 * Endpoint PÚBLICO — accesible sin autenticación desde el formulario B2B
 * del frontend. La protección anti-spam se delega al tier "public-write"
 * del rate limiter (10 req/60s por IP).
 *
 * `marcaId` puede llegar vacío (el formulario no obliga a seleccionar marca).
 * El repositorio lo persiste como `null` en MongoDB si es string vacío.
 */
export class CreateLeadCorporativoUseCase {
  constructor(private readonly repository: ILeadCorporativoRepository) {}

  async execute(
    dto: CreateLeadCorporativoDTO
  ): Promise<LeadCorporativoResponseDTO> {
    const created = await this.repository.create({
      nombres: dto.nombres,
      apellidos: dto.apellidos ?? "",
      dni: dto.dni ?? "",
      correoElectronico: dto.correoElectronico,
      celular: dto.celular,
      razonSocial: dto.razonSocial ?? "",
      ruc: dto.ruc ?? "",
      marcaId: dto.marcaId ?? "",
      marcaText: dto.marcaText ?? "",
      ciudad: dto.ciudad ?? "",
      intencionCompra: dto.intencionCompra ?? "",
      sector: dto.sector ?? "",
    })

    return LeadCorporativoMapper.toDTO(created)
  }
}
