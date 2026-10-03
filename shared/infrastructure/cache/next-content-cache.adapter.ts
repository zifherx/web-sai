import { IContentCache } from "@/shared/domain/ports/content-cache.port"
import { revalidatePath } from "next/cache"

/**
 * Fase 1 de caché: ISR por ruta + `revalidatePath` al publicar.
 * (Next 16.2: `revalidatePath(path, type?)` es síncrona y no requiere perfil.)
 */
export class NextContentCache implements IContentCache {
  invalidatePaths(paths: readonly string[]): void {
    for (const path of new Set(paths)) revalidatePath(path)
  }
}
