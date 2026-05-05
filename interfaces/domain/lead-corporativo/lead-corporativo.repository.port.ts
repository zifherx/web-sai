import { LeadCorporativoEntity } from "@/interfaces/domain"

export interface ILeadCorporativoRepository {
  findAll(): Promise<LeadCorporativoEntity[]>
  findById(id: string): Promise<LeadCorporativoEntity | null>
  create(
    data: Omit<LeadCorporativoEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<LeadCorporativoEntity>
}
