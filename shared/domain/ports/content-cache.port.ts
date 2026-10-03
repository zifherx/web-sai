/**
 * Invalida las páginas públicas que muestran contenido publicado.
 * Adaptador: `NextContentCache` (revalidatePath). Los casos de uso
 * no importan `next/cache` directamente.
 */
export interface IContentCache {
  invalidatePaths(paths: readonly string[]): void
}
