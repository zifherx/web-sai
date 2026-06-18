import { LeadCorporativoEntity } from "@/modules/lead-corporativo/domain/entities/LeadCorporativo"

export interface LeadCorporativoFilters {
  marcaId?: string
  ciudad?: string
  sector?: string
}

export interface ICreateLeadCorporativoData {
  nombres: string
  apellidos: string
  dni: string
  correoElectronico: string
  celular: string
  razonSocial: string
  ruc: string
  marcaId: string
  marcaText: string
  ciudad: string
  intencionCompra: string
  sector: string
}

export interface ILeadCorporativoRepository {
  findAll(filters?: LeadCorporativoFilters): Promise<LeadCorporativoEntity[]>
  findById(id: string): Promise<LeadCorporativoEntity | null>
  create(data: ICreateLeadCorporativoData): Promise<LeadCorporativoEntity>
}
