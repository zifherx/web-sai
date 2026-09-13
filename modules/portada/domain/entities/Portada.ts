export class PortadaEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly imageUrl: string,
    public readonly isActive: boolean,
    public readonly createdBy: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly createdByNombre?: string
  ) {}

  isPublishable(): boolean {
    return this.isActive && this.imageUrl.length > 0
  }

  static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
  }
}
