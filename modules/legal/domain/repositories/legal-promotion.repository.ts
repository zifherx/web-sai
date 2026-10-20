import {
  type LegalPromotionEntity,
  type PromotionSettings,
} from "@/modules/legal/domain/entities/legal-promotion"
import { type VersionedContent } from "@/shared/domain/content-versioning/versioned-content"
import { type TransactionContext } from "@/shared/domain/ports/transaction-runner.port"

export interface ICreateLegalPromotionData extends PromotionSettings {
  slug: string
  order: number
  versioned: VersionedContent
}

export interface ILegalPromotionRepository {
  findAll(): Promise<LegalPromotionEntity[]>
  findActivePublished(): Promise<LegalPromotionEntity[]>
  findById(id: string): Promise<LegalPromotionEntity | null>
  findBySlug(slug: string): Promise<LegalPromotionEntity | null>
  nextOrder(): Promise<number>
  create(
    data: ICreateLegalPromotionData,
    tx?: TransactionContext
  ): Promise<LegalPromotionEntity>
  saveVersioned(
    id: string,
    versioned: VersionedContent,
    expectedLockVersion: number,
    tx?: TransactionContext
  ): Promise<LegalPromotionEntity | null>
  updateSettings(
    id: string,
    settings: PromotionSettings
  ): Promise<LegalPromotionEntity | null>
  reorder(orderedIds: readonly string[]): Promise<void>
  delete(id: string): Promise<LegalPromotionEntity | null>
}
