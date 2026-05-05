import {
  CreateLeadCorporativoDTO,
  LeadCorporativoMapper,
  LeadCorporativoResponseDTO,
} from "@/interfaces/application"
import { ILeadCorporativoRepository } from "@/interfaces/domain"

export class LeadCorporativoService {
  constructor(private readonly repository: ILeadCorporativoRepository) {}

  async getAll(): Promise<LeadCorporativoResponseDTO[]> {
    return LeadCorporativoMapper.toDTOList(await this.repository.findAll())
  }

  async create(
    dto: CreateLeadCorporativoDTO
  ): Promise<LeadCorporativoResponseDTO> {
    const lead = await this.repository.create({
      nombres: dto.nombres,
      apellidos: dto.apellidos ?? "",
      dni: dto.dni,
      correoElectronico: dto.correoElectronico,
      celular: dto.celular,
      razonSocial: dto.razonSocial,
      ruc: dto.ruc,
      marcaId: dto.marcaId,
      marcaText: dto.marcaText,
      ciudad: dto.ciudad,
      intencionCompra: dto.intencionCompra,
      sector: dto.sector,
    })
    return LeadCorporativoMapper.toDTO(lead)
  }
}
