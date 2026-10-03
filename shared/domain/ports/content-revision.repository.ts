import {
  ContentEntityType,
  ContentRevision,
  NewContentRevisionData,
} from "@/shared/domain/content-versioning/content-revision"
import { TransactionContext } from "@/shared/domain/ports/transaction-runner.port"

export interface IContentRevisionRepository {
  create(
    data: NewContentRevisionData,
    tx?: TransactionContext
  ): Promise<ContentRevision>
  findById(id: string): Promise<ContentRevision | null>
  /** Ordenadas por versión descendente (la más reciente primero). */
  findByEntity(
    entityType: ContentEntityType,
    entityId: string
  ): Promise<ContentRevision[]>
}
