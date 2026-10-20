import {
  type ContentEntityType,
  type ContentRevision,
  type NewContentRevisionData,
} from "@/shared/domain/content-versioning/content-revision"
import { type TransactionContext } from "@/shared/domain/ports/transaction-runner.port"

export interface IContentRevisionRepository {
  create(
    data: NewContentRevisionData,
    tx?: TransactionContext
  ): Promise<ContentRevision>
  findById(id: string): Promise<ContentRevision | null>
  findByEntity(
    entityType: ContentEntityType,
    entityId: string
  ): Promise<ContentRevision[]>
}
