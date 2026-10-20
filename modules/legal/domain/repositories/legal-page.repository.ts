import {
  type LegalPageEntity,
  type LegalSlug,
} from "@/modules/legal/domain/entities/legal-page"
import { type VersionedContent } from "@/shared/domain/content-versioning/versioned-content"
import { type TransactionContext } from "@/shared/domain/ports/transaction-runner.port"

export interface ICreateLegalPageData {
  slug: LegalSlug
  versioned: VersionedContent
}

export interface ILegalPageRepository {
  findAll(): Promise<LegalPageEntity[]>
  findBySlug(slug: LegalSlug): Promise<LegalPageEntity | null>
  create(
    data: ICreateLegalPageData,
    tx?: TransactionContext
  ): Promise<LegalPageEntity>
  saveVersioned(
    id: string,
    versioned: VersionedContent,
    expectedLockVersion: number,
    tx?: TransactionContext
  ): Promise<LegalPageEntity | null>
}
