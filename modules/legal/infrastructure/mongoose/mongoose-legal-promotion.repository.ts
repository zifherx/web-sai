import {
  LegalPromotionEntity,
  type PromotionSettings,
} from "@/modules/legal/domain/entities/legal-promotion"
import {
  type ICreateLegalPromotionData,
  type ILegalPromotionRepository,
} from "@/modules/legal/domain/repositories/legal-promotion.repository"
import {
  type LegalPromotionFields,
  type LegalPromotionLean,
} from "@/modules/legal/infrastructure/mongoose/legal-promotion.schema"
import { type VersionedContent } from "@/shared/domain/content-versioning/versioned-content"
import { type TransactionContext } from "@/shared/domain/ports/transaction-runner.port"
import {
  fromVersionedContent,
  toVersionedContent,
} from "@/shared/infrastructure/content-versioning/mongoose/versioned-content.persistence"
import { toSession } from "@/shared/infrastructure/mongoose/mongoose-transaction-runner"
import { isValidObjectId, type Model } from "mongoose"

export class MongooseLegalPromotionRepository implements ILegalPromotionRepository {
  constructor(private readonly model: Model<LegalPromotionFields>) {}

  private toEntity(doc: LegalPromotionLean): LegalPromotionEntity {
    return new LegalPromotionEntity(
      doc._id.toString(),
      doc.slug,
      toVersionedContent(doc),
      doc.validFrom ?? null,
      doc.validTo ?? null,
      doc.isActive,
      doc.order,
      doc.attachment
        ? { url: doc.attachment.url, name: doc.attachment.name }
        : null,
      doc.createdAt,
      doc.updatedAt
    )
  }

  async findAll(): Promise<LegalPromotionEntity[]> {
    const docs = await this.model
      .find()
      .sort({ order: 1 })
      .lean<LegalPromotionLean[]>()
    return docs.map((d) => this.toEntity(d))
  }

  async findActivePublished(): Promise<LegalPromotionEntity[]> {
    const docs = await this.model
      .find({ isActive: true, published: { $ne: null } })
      .sort({ order: 1 })
      .lean<LegalPromotionLean[]>()
    return docs.map((d) => this.toEntity(d))
  }

  async findById(id: string): Promise<LegalPromotionEntity | null> {
    if (!isValidObjectId(id)) return null
    const doc = await this.model.findById(id).lean<LegalPromotionLean>()
    return doc ? this.toEntity(doc) : null
  }

  async findBySlug(slug: string): Promise<LegalPromotionEntity | null> {
    const doc = await this.model.findOne({ slug }).lean<LegalPromotionLean>()
    return doc ? this.toEntity(doc) : null
  }

  async nextOrder(): Promise<number> {
    const last = await this.model
      .findOne({}, { order: 1 })
      .sort({ order: -1 })
      .lean<Pick<LegalPromotionLean, "order">>()
    return (last?.order ?? 0) + 1
  }

  async create(
    data: ICreateLegalPromotionData,
    tx?: TransactionContext
  ): Promise<LegalPromotionEntity> {
    const [doc] = await this.model.create(
      [
        {
          slug: data.slug,
          ...fromVersionedContent(data.versioned),
          validFrom: data.validFrom,
          validTo: data.validTo,
          isActive: data.isActive,
          order: data.order,
          attachment: data.attachment,
        },
      ],
      { session: toSession(tx) }
    )
    if (!doc) throw new Error("No se pudo crear la campaña")
    return this.toEntity(doc.toObject() as LegalPromotionLean)
  }

  async saveVersioned(
    id: string,
    versioned: VersionedContent,
    expectedLockVersion: number,
    tx?: TransactionContext
  ): Promise<LegalPromotionEntity | null> {
    const doc = await this.model
      .findOneAndUpdate(
        { _id: id, lockVersion: expectedLockVersion },
        { $set: fromVersionedContent(versioned) },
        {
          returnDocument: "after",
          runValidators: true,
          session: toSession(tx),
        }
      )
      .lean<LegalPromotionLean>()
    return doc ? this.toEntity(doc) : null
  }

  async updateSettings(
    id: string,
    settings: PromotionSettings
  ): Promise<LegalPromotionEntity | null> {
    if (!isValidObjectId(id)) return null
    const doc = await this.model
      .findByIdAndUpdate(
        id,
        {
          $set: {
            validFrom: settings.validFrom,
            validTo: settings.validTo,
            isActive: settings.isActive,
            attachment: settings.attachment,
          },
        },
        { returnDocument: "after", runValidators: true }
      )
      .lean<LegalPromotionLean>()
    return doc ? this.toEntity(doc) : null
  }

  async reorder(orderedIds: readonly string[]): Promise<void> {
    await this.model.bulkWrite(
      orderedIds.map((id, index) => ({
        updateOne: {
          filter: { _id: id },
          update: { $set: { order: index + 1 } },
        },
      }))
    )
  }

  async delete(id: string): Promise<LegalPromotionEntity | null> {
    if (!isValidObjectId(id)) return null
    const doc = await this.model
      .findByIdAndDelete(id)
      .lean<LegalPromotionLean>()
    return doc ? this.toEntity(doc) : null
  }
}
