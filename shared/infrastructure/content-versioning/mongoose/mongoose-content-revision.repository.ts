import {
  ContentEntityType,
  ContentRevision,
  NewContentRevisionData,
} from "@/shared/domain/content-versioning/content-revision"
import { IContentRevisionRepository } from "@/shared/domain/ports/content-revision.repository"
import { TransactionContext } from "@/shared/domain/ports/transaction-runner.port"
import { RichContent } from "@/shared/domain/rich-text/rich-content"
import {
  ContentRevisionFields,
  ContentRevisionLean,
} from "@/shared/infrastructure/content-versioning/mongoose/content-revision.schema"
import { toSession } from "@/shared/infrastructure/mongoose/mongoose-transaction-runner"
import { isValidObjectId, type Model } from "mongoose"

export class MongooseContentRevisionRepository implements IContentRevisionRepository {
  constructor(private readonly model: Model<ContentRevisionFields>) {}

  private toEntity(doc: ContentRevisionLean): ContentRevision {
    return new ContentRevision(
      String(doc._id),
      doc.entityType,
      String(doc.entityId),
      doc.version,
      {
        title: doc.title,
        content: doc.content as RichContent,
        plainText: doc.plainText ?? "",
        seo: doc.seo
          ? { title: doc.seo.title, description: doc.seo.description }
          : null,
      },
      doc.publishedAt,
      { userId: doc.publishedBy.userId, name: doc.publishedBy.name },
      doc.note ?? null,
      doc.operational
        ? {
            validFrom: doc.operational.validFrom ?? null,
            validTo: doc.operational.validTo ?? null,
            isActive: doc.operational.isActive,
          }
        : null
    )
  }

  async create(
    data: NewContentRevisionData,
    tx?: TransactionContext
  ): Promise<ContentRevision> {
    const [doc] = await this.model.create(
      [
        {
          entityType: data.entityType,
          entityId: data.entityId,
          version: data.version,
          title: data.snapshot.title,
          content: data.snapshot.content,
          plainText: data.snapshot.plainText,
          seo: data.snapshot.seo,
          operational: data.operational,
          publishedAt: data.publishedAt,
          publishedBy: data.publishedBy,
          note: data.note,
        },
      ],
      // `create([...], { session })`: forma requerida para usar sesión.
      { session: toSession(tx) }
    )
    if (!doc) throw new Error("No se pudo crear la revisión")
    return this.toEntity(doc.toObject() as ContentRevisionLean)
  }

  async findById(id: string): Promise<ContentRevision | null> {
    if (!isValidObjectId(id)) return null
    const doc = await this.model.findById(id).lean<ContentRevisionLean>()
    return doc ? this.toEntity(doc) : null
  }

  async findByEntity(
    entityType: ContentEntityType,
    entityId: string
  ): Promise<ContentRevision[]> {
    const docs = await this.model
      .find({ entityType, entityId })
      .sort({ version: -1 })
      .lean<ContentRevisionLean[]>()
    return docs.map((d) => this.toEntity(d))
  }
}
