import { type LegalPageSummaryDTO } from "@/modules/legal/application/dto/legal.dto"
import { LegalMapper } from "@/modules/legal/application/ports/legal.mapper"
import { type ILegalPageRepository } from "@/modules/legal/domain/repositories/legal-page.repository"

export class ListLegalPagesUseCase {
  constructor(private readonly pages: ILegalPageRepository) {}

  async execute(): Promise<LegalPageSummaryDTO[]> {
    const items = await this.pages.findAll()
    return items.map((p) => LegalMapper.toPageSummaryDTO(p))
  }
}
