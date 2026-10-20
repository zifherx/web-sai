export interface IContentCache {
  invalidatePaths(paths: readonly string[]): void
}
