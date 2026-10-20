import {
  LEGAL_SLUGS,
  LegalPageEntity,
  type LegalSlug,
} from "@/modules/legal/domain/entities/legal-page"
import {
  type ICreateLegalPageData,
  type ILegalPageRepository,
} from "@/modules/legal/domain/repositories/legal-page.repository"
import {
  type LegalPageFields,
  type LegalPageLean,
} from "@/modules/legal/infrastructure/mongoose/legal-page.schema"
import { type VersionedContent } from "@/shared/domain/content-versioning/versioned-content"
import { type TransactionContext } from "@/shared/domain/ports/transaction-runner.port"
import {
  fromVersionedContent,
  toVersionedContent,
} from "@/shared/infrastructure/content-versioning/mongoose/versioned-content.persistence"
import { toSession } from "@/shared/infrastructure/mongoose/mongoose-transaction-runner"
import { type Model } from "mongoose"

export class MongooseLegalPageRepository implements ILegalPageRepository {
  constructor(private readonly model: Model<LegalPageFields>) {}

  private toEntity(doc: LegalPageLean): LegalPageEntity {
    return new LegalPageEntity(
      doc._id.toString(),
      doc.slug,
      toVersionedContent(doc),
      doc.createdAt,
      doc.updatedAt
    )
  }

  async findAll(): Promise<LegalPageEntity[]> {
    const docs = await this.model.find().lean<LegalPageLean[]>()
    return docs
      .map((d) => this.toEntity(d))
      .sort((a, b) => LEGAL_SLUGS.indexOf(a.slug) - LEGAL_SLUGS.indexOf(b.slug))
  }

  async findBySlug(slug: LegalSlug): Promise<LegalPageEntity | null> {
    const doc = await this.model.findOne({ slug }).lean<LegalPageLean>()
    return doc ? this.toEntity(doc) : null
  }

  async create(
    data: ICreateLegalPageData,
    tx?: TransactionContext
  ): Promise<LegalPageEntity> {
    const [doc] = await this.model.create(
      [{ slug: data.slug, ...fromVersionedContent(data.versioned) }],
      { session: toSession(tx) }
    )
    if (!doc) throw new Error("No se pudo crear la página legal")
    return this.toEntity(doc.toObject() as LegalPageLean)
  }

  async saveVersioned(
    id: string,
    versioned: VersionedContent,
    expectedLockVersion: number,
    tx?: TransactionContext
  ): Promise<LegalPageEntity | null> {
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
      .lean<LegalPageLean>()
    return doc ? this.toEntity(doc) : null
  }
}
