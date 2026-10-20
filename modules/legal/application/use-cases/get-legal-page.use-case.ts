import { type LegalPageDTO } from "@/modules/legal/application/dto/legal.dto"
import { LegalMapper } from "@/modules/legal/application/ports/legal.mapper"
import { type LegalSlug } from "@/modules/legal/domain/entities/legal-page"
import { LegalPageNotFoundError } from "@/modules/legal/domain/errors/legal.error"
import { type ILegalPageRepository } from "@/modules/legal/domain/repositories/legal-page.repository"

export class GetLegalPageUseCase {
  constructor(private readonly pages: ILegalPageRepository) {}

  async execute(slug: LegalSlug): Promise<LegalPageDTO> {
    const page = await this.pages.findBySlug(slug)
    if (!page) throw new LegalPageNotFoundError(slug)
    return LegalMapper.toPageDTO(page)
  }
}
