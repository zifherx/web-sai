import { type IContentCache } from "@/shared/domain/ports/content-cache.port"
import { revalidatePath } from "next/cache"

export class NextContentCache implements IContentCache {
  invalidatePaths(paths: readonly string[]): void {
    for (const path of new Set(paths)) revalidatePath(path)
  }
}
